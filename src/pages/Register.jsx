import '../App.css';
import LostFoundText from '../components/LostFoundText';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        // Confirm password validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        // Call API
        axios.post(import.meta.env.VITE_API_URL + "/api/user", {
            email,
            phoneNumber,
            password
        }).then((response) => {
            toast.success("Registration successful!");
            navigate("/Login");
        }).catch((error) => {
            console.error("Registration failed:", error);
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        });
    }

    return (
        <>
            <div className='w-full h-screen flex'>

                {/* Left Side */}
                <div className='w-[50%] h-full flex justify-center items-center'>
                    <LostFoundText />
                </div>

                {/* Right Side */}
                <div className='w-[50%] h-full flex justify-center items-center '>
                    <div className='w-[600px] h-auto backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center p-6 bg-gray-500'>

                        {/* Title */}
                        <h1 className='text-5xl font-bold text-black mb-6'>Register</h1>

                        {/* Email */}
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder='Email'
                            className='border border-white rounded-xl text-center bg-white mb-3 mt-4'
                            style={{ width: '400px', height: '50px' }}
                        />

                        {/* Phone Number */}
                        <input 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="text" 
                            placeholder='Phone Number'
                            className='border border-white rounded-xl text-center bg-white mb-3'
                            style={{ width: '400px', height: '50px' }}
                        />

                        {/* Password */}
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            placeholder='Password'
                            className='border border-white rounded-xl text-center bg-white mb-3'
                            style={{ width: '400px', height: '50px' }}
                        />

                        {/* Confirm Password */}
                        <input 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password" 
                            placeholder='Confirm Password'
                            className='border border-white rounded-xl text-center bg-white mb-3'
                            style={{ width: '400px', height: '50px' }}
                        />

                        {/* Register Button */}
                        <button 
                            onClick={handleRegister}
                            className=' bg-blue-500 hover:bg-blue-600 text-white rounded-xl mb-2' style={{ width: '400px', height: '50px' }}
                        >
                            Register
                        </button>

                        {/* Already have an account */}
                        <p className='text-white text-base mt-4'>
                            Already have an account?
                            &nbsp;
                            <span>
                                <Link to={"/Login"} className='cursor-pointer text-lg' style={{color:"yellow", textDecoration: "none"}}>Login</Link>
                            </span>
                        </p>

                    </div>
                </div>

            </div>
        </>
    )
}
