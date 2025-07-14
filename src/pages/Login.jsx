import '../App.css';
import LostFoundText from '../components/LostFoundText';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { color } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function handleLogin() {
        console.log("Email:", email);
        console.log("Password:", password);
        
         axios.post(import.meta.env.VITE_API_URL+"/api/user/login", {
            email: email,
            password: password
        }).then((response) => {
            toast.success("Login successful!");
            localStorage.setItem("token", response.data.token);
            navigate("/");
        }).catch((error) => {
            console.error("Login failed:", error);
            toast.error(error.response.data.message || "Login failed. Please try again.");
           
        } )

    }

    return (
        <>
             <div className='w-full h-screen flex'>

                {/* Left Side */}
                <div className='w-[50%] h-full flex justify-center items-center'>
                    {/* Optional image or illustration */}
                    <LostFoundText />
                </div>

                {/* Right Side */}
                <div className='w-[50%] h-full flex justify-center items-center '>
                    <div className='w-[600px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center p-6 bg-gray-500'>

                        {/* Title */}
                        <h1 className='text-7xl font-bold text-black mb-6' style={{ marginBottom: '30px' }}>Login</h1>

                        {/* Username */}
                        <input onChange={(e) => setEmail(e.target.value)}
                            type="text" 
                            placeholder='Email' 
                            className='border border-white rounded-xl text-center bg-white mb-4' style={{ width: '400px', height: '50px' }}
                        />

                        {/* Password */}
                        <input onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            placeholder='Password' 
                            className='border border-white rounded-xl text-center bg-white mb-6'style={{ width: '400px', height: '50px' }}
                        />

                        {/* Sign In Button */}
                        <button onClick={handleLogin}
                            className='w-[400px] h-[50px] bg-blue-500 hover:bg-blue-600 text-white rounded-xl mb-2' style={{ marginTop: '20px' }}
                        >
                            Sign In
                        </button>

                       

                        {/* Register Button */}
                        <p className='text-white text-base mt-4'>
                            Don't have an account?
                            &nbsp;
                            <span>
                                <Link to={"/Register"} className='cursor-pointer text-lg' style={{color:"yellow", textDecoration: "none"}}> Register</Link>
                            </span>
                        </p>

                    </div>
                </div>

            </div>
        </>
    )
}