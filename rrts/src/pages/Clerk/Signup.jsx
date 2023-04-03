import React, { useState, useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/context";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      // navigate('/account')
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/clerkmain");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/clerkmain");
    }
  }, [user]);

  return (
    <div className="bg-gray-300 h-auto">
      <div className="max-w-[700px] mx-auto py-20 p-4">
        <div>
          <h1 className="text-2xl font-bold py-2">
            Sign up for a free account
          </h1>
          <p className="py-2">
            Already have an account yet?{" "}
            <Link to="/clerksignin" className="underline">
              Sign in.
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3"
              type="password"
            />
          </div>
          <button className="border border-gray-500 bg-gray-800 w-full p-4 my-2 font-bold text-white">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        {/* <h1 className="text-center text-3xl font-bold py-8">Sign Up</h1> */}
        <div className="max-w-[240px] m-auto">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
