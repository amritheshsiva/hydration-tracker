import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const checkAuth = (Component) => {
    function Wrapper(props){
        const user = useSelector(state => state.auth.user);
        const navigate = useNavigate();
        
    useEffect(() => {
        if (user === undefined) return;
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    
    if (user === undefined) return null;
    
    return user ? <Component {...props} /> : null;
    } 
    
    return Wrapper;
};

export default checkAuth;
