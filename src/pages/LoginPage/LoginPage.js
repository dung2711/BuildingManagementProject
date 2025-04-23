import React, {useState} from "react";
import { useAuth } from "../../contexts/AuthContext";
import login from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage() {
    const {login: doLogin} = useAuth();
    const navigate = useNavigate();
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
        }
    }
    return (
        <div id="loginPage">
            <form onSubmit={handleSubmit} id="loginForm">
                <h1>Đăng nhập</h1>
                <input onChange={handleUserInput} type="email" name="email" value={text.email} placeholder="Email" />
                <input onChange={handleUserInput} type="password" name="password" value={text.password} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}