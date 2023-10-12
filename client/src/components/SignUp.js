import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { name, registerUser, error } = useAppContext();

  const handleClick = (e) => {
    e.preventDefault();

    if (fname && email && password) {
      console.log({ fname, email, password });
      registerUser({ name: fname, email, password });
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
              <h2 className="text-2xl font-semibold mb-2 mt-5">Welcome</h2>
              <p>Signup to Continue</p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-3 items-start w-full mt-14">
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border-b-2 border-[#777777] md:w-96 placeholder:text-[#777777] pb-2 outline-none text-sm"
                onChange={(e) => setFName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b-2 border-[#777777] md:w-96 placeholder:text-[#777777] pb-2 outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mb-3">
                <input
                  type="Password"
                  placeholder="Password"
                  className="bg-transparent border-b-2 border-[#777777] md:w-96 placeholder:text-[#777777] pb-2 outline-none mb-1 text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-[#777]">
                  {password.length < 6 && "Minimum 6 characters"}
                </p>
              </div>
              <p className="text-[#777777] text-sm">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-white">
                  Sign In
                </Link>
              </p>
              <p className="text-sm text-red-400">{error && error}</p>
              <div className="mt-14">
                <button
                  className={`bg-[#4553FE] px-10 py-2 text-sm ${
                    !fname || !email || !password ? "cursor-not-allowed" : ""
                  }`}
                  onClick={handleClick}
                  disabled={!fname && !email && !password}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
