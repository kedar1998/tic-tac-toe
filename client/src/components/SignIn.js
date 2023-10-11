import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext.js";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { name, loginUser } = useAppContext();

  const handleClick = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log({ email, password });
      loginUser({ email, password });
    }
  };

  useEffect(() => {
    if (name) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [name, navigate]);

  return (
    <div className="bg-[#181818] text-white font-poppins">
      <div className="max-w-[1440px] mx-auto h-screen">
        <div className="h-full w-full flex justify-center items-center">
          <div className="p-5 border-2 border-[#333333] ">
            {/* Top Display */}
            <div>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="text-2xl font-semibold mb-2 mt-5">
                Welcome Back!
              </h2>
              <p>Login to Continue</p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-3 items-start w-full mt-14">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b-2 border-[#777777] md:w-96 placeholder:text-[#777777] pb-2 outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="Password"
                placeholder="Password"
                className="bg-transparent md:w-96 border-b-2 border-[#777777] placeholder:text-[#777777] pb-2 outline-none my-3 text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-[#777777] text-sm">
                Don’t have an account?{" "}
                <Link to="/sign-up" className="text-white">
                  Sign up
                </Link>
              </p>
              <div className="mt-14">
                <button
                  className="bg-[#4553FE] px-10 py-2 text-sm"
                  onClick={handleClick}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
