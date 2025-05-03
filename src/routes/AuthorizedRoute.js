import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({children, allowedRoles}){
    const {token, role} = useAuth();
    const navigate = useNavigate(); 
    if(!token) return navigate("/");
    if(allowedRoles && !allowedRoles.includes(role)) return navigate("/");
    return children; 
}