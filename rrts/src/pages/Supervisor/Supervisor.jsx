import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/context";

const Officer = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gray-300 h-screen">
      <h1 className="flex justify-center h-20 items-center font-bold text-3xl">
        Supervisor
      </h1>
      <div className="flex justify-center h-55 items-center">
        {user?.displayName ? (
          <>
          <button className="p-3 font-bold text-3xl" onClick={handleSignOut}>
            LogOut
          </button>
          <Link
            className="bg-emerald-500 rounded p-3 text-white font-bold text-3xl"
            to="/supervisorsignin"
          >
            Access
          </Link>
          </>
        ) : (
          <Link
            className="bg-emerald-500 rounded p-3 text-white font-bold text 5xl"
            to="/supervisorsignin"
          >
            Access
          </Link>
        )}
      </div>
    </div>
  );
};

export default Officer;
