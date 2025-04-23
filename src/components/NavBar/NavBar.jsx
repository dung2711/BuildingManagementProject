import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./NavBar.css"

export default function NavBar() {
    const { token, role, logout } = useAuth();
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
                {role === "manager" && (
                    <li><a href="/customer">
                        Customer
                    </a>
                    </li>
                )}

                {role === "customer" && (
                    <li><a href="/complaint">
                        Complaint/Feedback
                    </a>
                    </li>
                )}
                {role === "manager" && (
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
                    <li><a onClick={logout}>
                        Logout
                    </a>
                    </li>
                )}
            </ul>
        </nav>
    )
}