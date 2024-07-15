import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashBoard = () => {
    const {user}=useContext(AuthContext);
    console.log(user)
    return (
        <div>
            <h1>hello {user.name} Your current balance is {user.balance}tk</h1>
        </div>
    );
};

export default DashBoard;