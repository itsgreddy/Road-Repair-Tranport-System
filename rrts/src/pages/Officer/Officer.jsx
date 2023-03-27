import React from 'react'
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/context";

const Officer = () => {

  const {user, logOut} = UserAuth()

  const handleSignOut = async() => {
      try{
          await logOut()
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <div className="">
      <h1>Officer</h1>
      {user?.displayName ? (
            <button onClick={handleSignOut}>Log Out</button> 
            ) : (
                <Link to='/officersignin'>Sign Up</Link>
            )}
    </div>

  )
}

export default Officer