import React, {useState, useRef} from "react";
import { useAuth } from "../../contexts/AuthContext";
import login from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import FlashMessage from "../../components/FlashMessage";

export default function LoginPage() {
    const {login: doLogin} = useAuth();
    const navigate = useNavigate();
    const [flashMessage, setFlashMessage] = useState(false);
    const [message, setMessage] = useState(""); 
    const [severity, setSeverity] = useState("");

    const timeOutRef = useRef(null);

    const [text, setText] = useState({
        email: "",
        password: ""
    })
    function handleUserInput(event) {
        const { name, value } = event.target;
        setText((prevValue) => {
            return (
                {
                    ...prevValue,
                    [name]: value
                }
            )
        })
    }
    async function handleSubmit(event){
        event.preventDefault();
        try {
            const res = await login(text.email, text.password);
            localStorage.setItem("user", text.email);
            await doLogin(res.data.token, res.data.role);
            navigate("/");
        } catch (error) {
            console.log("Login failed");
            renderFlashMessage("Login failed", "error");
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
        <div id="loginPage">
            <form onSubmit={handleSubmit} id="loginForm">
                <h1>Đăng nhập</h1>
                <input onChange={handleUserInput} type="email" name="email" value={text.email} placeholder="Email" />
                <input onChange={handleUserInput} type="password" name="password" value={text.password} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />}
        </div>
    )
}