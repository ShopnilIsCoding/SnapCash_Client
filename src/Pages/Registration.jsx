// Registration.js
import { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
    Radio
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

const Registration = () => {
    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pin.length !== 5 || isNaN(pin)) {
            toast.error('PIN must be a 5-digit number');
            return;
        }

        const balance = role === 'user' ? 40 : 10000;

        try {
            await axiosInstance.post('/users/register', { name, pin, mobileNumber, email, role, balance });
            toast.success('Registration successful. Please wait for admin approval.');
            navigate('/login')
        } catch (error) {
            toast.error(error.response.data.error || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center text-white p-4">
            <div className="border border-secondary rounded-3xl p-2 lg:p-6 shadow-2xl">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" className='text-accent'>
                        Registration
                    </Typography>
                    <Typography  className="mt-1 font-normal">
                        Welcome to <span className="text-secondary font-bold">SNAPCASH</span>! Enter your details to register.
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6"  className="-mb-3">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6"  className="-mb-3">
                                Your PIN
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
                            <Typography variant="h6"  className="-mb-3">
                                Your Mobile Number
                            </Typography>
                            <Input
                                size="lg"
                                maxLength={11}
                                minLength={11}
                                placeholder="ex:01745XXXXXX"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6"  className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                type="email"
                                size="lg"
                                placeholder="ex:johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6"  className="-mb-3">
                                Register As
                            </Typography>
                            <div className="flex gap-4">
                                <Radio
                                    id="user"
                                    name="role"
                                    label="User"
                                    checked={role === 'user'}
                                    onChange={() => setRole('user')}
                                />
                                <Radio
                                    id="agent"
                                    name="role"
                                    label="Agent"
                                    checked={role === 'agent'}
                                    onChange={() => setRole('agent')}
                                />
                            </div>
                        </div>
                        <Button className="mt-6" fullWidth type="submit">
                            Register
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to={'/login'} className="font-medium text-accent">
                                Log In
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Registration;
