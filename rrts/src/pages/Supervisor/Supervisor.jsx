import React from 'react'
import { Link } from "react-router-dom";

import './Supervisor.css'

import { UserAuth } from "../../context/context";

const Supervisor = () => {

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
      <h1>Supervisor</h1>
      {user?.displayName ? (
            <button onClick={handleSignOut}>Log Out</button> 
            ) : (
                <Link to='/supervisorsignin'>Sign Up</Link>
            )}
    </div>

  )
}

export default Supervisor