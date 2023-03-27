import React, { useEffect } from "react";
import { GoogleButton } from 'react-google-button'
import { useNavigate } from "react-router-dom";

import { UserAuth } from "../../context/context";

const Signin = () => {

    const {googleSignIn, user} = UserAuth();
    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try{
            await googleSignIn()
            // navigate('/account')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(user != null) {
            navigate('/supervisormain');
        }
    },[user])

    return(
        <div>
            <h1>Sign Up</h1>
            <div className="">
                <GoogleButton onClick={handleGoogleSignIn}/>
                </div>
        </div>
    );
};

export default Signin;