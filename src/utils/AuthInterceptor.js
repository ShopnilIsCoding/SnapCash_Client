// AuthInterceptor.js
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import useLogoutUtility from './logoutUtility';

const AuthInterceptor = () => {
  const handleLogout = useLogoutUtility();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          handleLogout(); 
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [handleLogout]);

  return null;
};

export default AuthInterceptor;
