import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const SideNav = () => {
    const { logout } = useContext(AuthContext);
    const navigate=useNavigate();
    const handleSignOut = () => {
        logout()
        navigate("/login");
      };
    return (
        <div>
            <button className="btn btn-accent" onClick={handleSignOut}>Logout</button>
        </div>
    );
};

export default SideNav;