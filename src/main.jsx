import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './Pages/Registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import { AuthProvider } from './context/AuthContext';
import  Root  from '../src/Layout/Root';
import DashBoard from './Pages/DashBoard';
import PrivateRoute from './Routes/PrivateRoutes';
const router = createBrowserRouter([
  {
    path:"/",
    element:<Root></Root>,
    children:[
      {
        path:'/',
        element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>
      }
    ]
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
    
  },
  {
    path:"/login",
    element:<Login></Login>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)
