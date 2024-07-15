
import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="container mx-auto">
            <Navbar></Navbar>
            <div className=" flex flex-col lg:flex row">
                <SideNav></SideNav>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Root;