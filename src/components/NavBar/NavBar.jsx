import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
    const { token, role, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <nav>
            <ul>
                {token && role !== "admin" && (
                    <li><a href="/issue">
                        Issue
                    </a>
                    </li>
                )}
                {token && role !== "admin" && (
                    <li><a href="/order">
                        Order
                    </a>
                    </li>
                )}
                {token && role === "manager" && (
                    <li><a href="/customer">
                        Customer
                    </a>
                    </li>
                )}

                {token &&role !== "admin" && (
                    <li><a href="/complaint">
                        Complaint/Feedback
                    </a>
                    </li>
                )}
                {token && role === "manager" && (
                    <li><a href="/property">
                        Property
                    </a>
                    </li>
                )}
                {token && role === "admin" && (
                    <li><a href="/user">
                        User
                    </a>
                    </li>
                )}
                <li><a href="/">HomePage</a></li>
                {!token && (
                    <li><a href="/login">
                        Login
                    </a>
                    </li>
                )}
                {token && (
                    <li><a onClick={(event) => {
                            logout();
                            navigate("/");
                    }}>
                        Logout
                    </a>
                    </li>
                )}
                {token && (
                    <li><a href="/change-password">
                        Change Password
                    </a>
                    </li>
                )}
            </ul>
        </nav>
    )
}