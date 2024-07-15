// AuthProvider.js
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email] = useState(localStorage.getItem('email'));
  const token = localStorage.getItem('token');
  useEffect(() => {
    
    console.log(token)
    if (token ) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user data or validate token here
      axiosInstance.get(`/users/${email}`)
        .then(response => {
        setUser(response.data);
        console.log(response.data)
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('email')
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    localStorage.setItem('email', user.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
