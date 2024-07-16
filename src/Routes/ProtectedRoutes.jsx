/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import { Spinner } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading ) {
    return <div className="h-screen flex justify-center items-center">
    <Spinner className="h-16 w-16 text-gray-900/50" />
  </div>;
  }

  if ( allowedRoles==user.role) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default ProtectedRoute;