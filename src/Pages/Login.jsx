// Login.js
/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('users/login', { identifier, pin });
      login(data.token, data.user);
      navigate('/');
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center text-white">
      <div className="border border-secondary rounded-3xl p-2 lg:p-4 shadow-2xl">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray" className='text-accent'>
            Login
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6"  className="-mb-3">
                Mobile Number or Email
              </Typography>
              <Input
                size="lg"
                placeholder="Mobile Number or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6"  className="-mb-3">
                PIN
              </Typography>
              <Input
                size="lg"
                type="password"
                minLength={5}
                maxLength={5}
                placeholder="Your 5 Digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button className="mt-6" fullWidth type="submit" >
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to={'/registration'} className="font-medium text-accent">
                Register
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
