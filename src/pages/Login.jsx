import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, password });
      localStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto p-4 md:pt-20 sm:p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-stretch justify-between">
          {/* Left section */}
          <div className="w-full lg:w-3/5 bg-[#f2f2f2] rounded-lg flex justify-center items-center mb-8 lg:mb-0 lg:mr-8">
            <div className="w-full h-64 sm:h-96 lg:h-auto aspect-w-16 aspect-h-9 overflow-hidden bg">
              <img
                src="https://t4.ftcdn.net/jpg/06/90/45/37/360_F_690453711_ooytriIZJ7lowJmsMfOM6zoT29MJP2W5.jpg"
                alt="Art Market"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center px-10">
            <form className="space-y-6" onSubmit={HandleLogin}>
              <h2 className="text-2xl sm:text-3xl font-bold font-graphik mb-6">SIGN IN</h2>

              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="username"
                placeholder="Username"
                required
                className="w-full p-3 sm:p-4 bg-[#f2f2f2] rounded-full font-graphik"
              />
              <input
                value={password} onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 sm:p-4 bg-[#f2f2f2] rounded-full font-graphik"
              />
              <button
                type="submit"
                className="w-full text-2xl font-graphik bg-black text-white p-3 rounded-full hover:bg-gray-700"
              >
                LOGIN
              </button>
              <p className="text-center text-sm sm:text-base">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
