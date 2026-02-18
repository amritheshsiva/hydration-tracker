import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/authSlice";
import axios from "axios";

function Navbar() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logout() {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;
        if (user) {
            axios.post("https://demo-blog.mashupstack.com/api/logout",
                {},
                {
                    headers: {
                        Authorization: "Bearer " + user.token
                    }
                }
            );
        }
        dispatch(removeUser());
        navigate("/login");
    }
    return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <div className="navbar-brand">
            <h4>WaterTrack</h4>
        </div>
        <ul className="navbar-nav ml-auto">
            {!user && (
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                </li>
            )}
            {!user && (
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
            )}
            {user && (
                <li className="nav-item">
                    <NavLink to="/home" className="nav-link">Home</NavLink>
                </li>
            )}
            {user && (
                <li className="nav-item">
                    <span className="nav-link" onClick={logout} style={{ cursor: "pointer" }}>
                        Logout
                    </span>
                </li>
            )}
        </ul>
    </nav>
    );
}

export default Navbar;
