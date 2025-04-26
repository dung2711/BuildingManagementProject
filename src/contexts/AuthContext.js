import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();


export function AuthProvider({children}){
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");
        if (savedToken) setToken(savedToken);
        if (savedRole) setRole(savedRole);
    }, []);
    const login = (newToken, userRole) => {
        setToken(newToken);
        setRole(userRole);
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", userRole);
    }
    const logout = () => {
        console.log("Logout function called");
        setToken("");
        setRole("");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }
    return (
        <AuthContext.Provider value={{token, role, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);