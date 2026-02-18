import { useState } from "react";
import Navbar from "../navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function attemptLogin() {
        axios.post("https://demo-blog.mashupstack.com/api/login", {
            email: email,
            password: password
        })
        .then(response => {
            const user = {
                email: email,
                token: response.data.token
            };
            dispatch(setUser(user));
            navigate("/home");
        })
        .catch(error => {
            if(error.response?.data?.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(" "));
            } 
            else if(error.response?.data?.message){
                setErrorMessage(error.response.data.message);
            } 
            else {
                setErrorMessage("Failed to login user.");
            }
        });
    }

return (
<div>
    <Navbar />
    <div className="container justify-content-center align-items-center vh-100">
        <h1>Login</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}
            </div>}
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" className="form-control mt-2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            
            <button className="btn btn-primary mt-2" onClick={attemptLogin}>Login </button>
    </div>
</div>
    );
}

export default Login;
