import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import logo from "./Untitled_Artwork.png";
import { auth, provider } from "./firebase";

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={logo} />
        <div className="login-text">
          <h1>Sign in to Chatter App</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
