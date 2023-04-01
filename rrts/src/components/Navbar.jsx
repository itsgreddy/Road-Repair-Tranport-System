import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/context";

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="flex justify-between w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          <Link to="/">Road Repair & Transport System</Link>
        </h1>
       <div className="flex gap-3 ">
        <Link to="/clerk">
          <button className="p-2" >Clerk</button>
        </Link>
        <Link to="/officer">
          <button className="p-2" >Community Officer</button>
        </Link>
        <Link to="/supervisor">
          <button className="p-2" >Supervisor</button>
        </Link>
      </div>        
        {/* {user?.displayName ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <Link to="/clerksignin">Sign in</Link>
      )} */}
      </div>
    </div>
  );
};

export default Navbar;