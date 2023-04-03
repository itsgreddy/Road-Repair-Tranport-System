import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/context";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, googleSignIn, user } = UserAuth();

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
      await signIn(email, password);
      navigate("/officermain");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/officermain");
    }
  }, [user]);

  return (
    <div className="bg-gray-300 h-auto">
      <div className="max-w-[700px] mx-auto p-4 py-20">
        <div>
          <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
          <p className="py-2">
            Don't have an account yet?{" "}
            <Link to="/officersignup" className="underline">
              Sign up.
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
            Sign In
          </button>
        </form>
      </div>
      <div>
        {/* <h1 className="text-center text-3xl font-bold py-8">Sign in</h1> */}
        <div className="max-w-[240px] m-auto">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
