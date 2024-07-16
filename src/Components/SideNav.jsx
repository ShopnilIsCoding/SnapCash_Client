import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";


const SideNav = () => {
    const { logout,user } = useContext(AuthContext);
    const navigate=useNavigate();
    const handleSignOut = () => {
        logout()
        navigate("/login");
      };
    return (
        <div>
            <div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ">
      {/* Sidebar content here */}
      <li><NavLink to={'/'}>Overview</NavLink></li>
      {user.role==='user' && <li><NavLink to={'/account'}>Account</NavLink></li>}
      {user.role ==='agent' && <li><NavLink to={'/agentAccount'}>Account</NavLink></li>}
      <li><NavLink to={'/transactions'}>Transactions</NavLink></li>
      <li onClick={handleSignOut}><a>Logout</a></li>
    </ul>
  </div>
</div>
            
        </div>
    );
};

export default SideNav;