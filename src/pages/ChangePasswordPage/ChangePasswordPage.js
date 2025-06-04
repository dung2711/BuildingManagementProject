import React, { useRef, useState } from "react";
import { changePassword } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FlashMessage from "../../components/FlashMessage";
import "./ChangePasswordPage.css"
import NavBar from "../../components/NavBar/NavBar";

export default function ChangePasswordPage() {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [text, setText] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordChecker: "",
    });
    const timeOutRef = useRef(null);
    const [flashMessage, setFlashMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const handleUserInput = (event) => {
        const {name, value} = event.target;
        setText(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(text.newPassword !== text.newPasswordChecker){
                renderFlashMessage("Mật khẩu phải trùng nhau", "error");
            } else {
            await changePassword(text.currentPassword, text.newPassword);
            logout();
            navigate("/login");
            }
        } catch (error) {
            console.log(error.response?.data);
            renderFlashMessage("Error changing password", "error");
        }
    }

    const handleFlashMessageClose = () => {
        console.log("Flash message closed");
        setFlashMessage(false);
    };
    const renderFlashMessage = (msg, severity) => {
        console.log("Render flash message:");
        setMessage(msg);
        setSeverity(severity);
        setFlashMessage(true);
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
            setFlashMessage(false);
        }, 3000);
    }
    return (
        <div>
            <NavBar />
        <div id="changePassPage">   
            <form onSubmit={handleSubmit} id="changePassForm">
                <h1>Thay đổi mật khẩu</h1>
                <input onChange={handleUserInput} type="text" name="currentPassword" value={text.currentPassword} placeholder="Enter Current Password" />
                <input onChange={handleUserInput} type="password" name="newPassword" value={text.newPassword} placeholder="Enter New Password" />
                <input onChange={handleUserInput} type="password" name="newPasswordChecker" value={text.newPasswordChecker} placeholder="Enter New Password Again" />
                <button type="submit">Change Password</button>
            </form>
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />}
        </div>
        </div>
    )
}