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
    <div className="p-4">
      <h1 className="flex justify-center h-20 items-center font-bold text-3xl">
        Community Officer
      </h1>
      <div className="flex justify-center h-55 items-center">
        {user?.displayName ? (
          <button className="p-3 font-bold text-3x1" onClick={handleSignOut}>
            LogOut
          </button>
        ) : (
          <Link
            className="bg-emerald-500 rounded p-3 text-white font-bold text 5xl"
            to="/officersignin"
          >
            Access
          </Link>
        )}
      </div>
    </div>
  );
};

export default Officer;
