import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-300/50">
        <div className="bg-white p-8 rounded-lg shadow-md w-[90%] lg:w-[400px]">
          <h1 className="text-3xl font-semibold mb-6 text-center text-violet-400">
            ChitChat
          </h1>
          <p className="text-center text-xl text-blue-400">Login</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="inputLR"
                placeholder="Email"
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-4">
              <input
                className="inputLR"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
            {error && (
              <p className="text-red-500 text-center mt-4">
                Something went wrong
              </p>
            )}
          </form>
          <p className="text-center mt-4">
            Do you have an account?
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
