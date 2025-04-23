import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({children, allowedRoles}){
    const {token, role} = useAuth();
    const navigate = useNavigate();
    if(!token) return navigate("/login");
    if(allowedRoles && !allowedRoles.includes(role)) return navigate("/login");
    return children; 
}