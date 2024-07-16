
import { useContext } from "react";
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Root = () => {
    const {loading}=useContext(AuthContext);
    if(loading)return
    return (
        <div className="container mx-auto">
            <Navbar></Navbar>
            <div className=" flex flex-col lg:flex-row  justify-center bg-base-200">
                <SideNav></SideNav>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Root;