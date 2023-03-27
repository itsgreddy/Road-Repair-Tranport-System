import React from 'react';
import { UserAuth } from '../../context/context';

const Account = () => {

  const {logOut, user} = UserAuth();

  const handleSignOut = async() => {
    try{
        await logOut()
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className=''>
      <h1 className=''>Account</h1>
      <div>
        <p>Welcome, {user?.displayName}</p>
      </div>
      <button onClick={handleSignOut} className=''>
        Logout
      </button>
    </div>
  );
};

export default Account;