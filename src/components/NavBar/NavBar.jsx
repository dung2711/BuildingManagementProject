import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./NavBar.css";

export default function NavBar() {
    const { token, role, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="https://img.freepik.com/free-vector/building-logo-icon-design-template-vector_67715-555.jpg?w=2000" alt="Logo" className="logo" />
            </div>

            <ul className="navbar-center">
                <li><a href="/" className={isActive("/")}><HomeIcon /></a></li>

                {token && role !== "admin" && (
                    <>
                        <li><a href="/issue" className={isActive("/issue")}>Issue</a></li>
                        <li><a href="/order" className={isActive("/order")}>Order</a></li>
                        <li><a href="/complaint" className={isActive("/complaint")}>Complaint</a></li>
                    </>
                )}

                {token && role === "manager" && (
                    <>
                        <li><a href="/customer" className={isActive("/customer")}>Customer</a></li>
                        <li><a href="/property" className={isActive("/property")}>Property</a></li>
                    </>
                )}

                {token && role === "admin" && (
                    <li><a href="/user" className={isActive("/user")}>User</a></li>
                )}
            </ul>

            <div className="navbar-right">
                {!token ? (
                    <a href="/login" className="login-btn">Login</a>
                ) : (
                    <div className="dropdown">
                        <button className="avatar-btn">
                            <AccountCircleIcon fontSize="large" />
                        </button>
                        <div className="dropdown-content">
                            <a href="/change-password" className={isActive("/change-password")}>
                                Change Password
                            </a>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
