import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, signInWithFacebook, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';

function Login() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/chats");
  }, [user, loading])

  return (
  
        <div id="login-page">
             <div id="login-card">
                 <h2>Welcome to Frisby Chat!</h2>
                 <div
                    className="login-button google"
                    onClick={() => signInWithGoogle()}
                    >
                    <GoogleOutlined/>Google Sign In
                    <br></br>

                </div>

                <div
                    className="login-button facebook"
                    onClick={() => signInWithFacebook()}
                >
                    <FacebookOutlined/>Facebook Sign In
                    <br></br>
                
            </div>
        </div>
    
    </div>
  )
}
export default Login;