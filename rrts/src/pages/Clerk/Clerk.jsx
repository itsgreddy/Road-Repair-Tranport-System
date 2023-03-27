import React from 'react'
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/context";

const Clerk = () => {

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
      <h1>Clerk</h1>
      {user?.displayName ? (
        <button onClick={handleSignOut}>LogOut</button> 
      ) : (
        <Link to='/clerksignin'>Sign Up</Link>
      )}
    </div>

  )
}

export default Clerk