import { Button } from "@material-ui/core";
import React from "react";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import google from "../../assets/icons/google.svg";
import Footer from "../Footer";
import Header from "../Header";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Header />

      <div className="login-container">
        <img src={logo} />
        <div>
          <p className="login-heading">Chatter App</p>
          <p className="login-text">Create channels, hangout with everyone</p>
        </div>
        <Button onClick={signIn} className="login-btn">
          <img src={google} />
          <p className="login-btn-text">Sign In With Google</p>
        </Button>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
