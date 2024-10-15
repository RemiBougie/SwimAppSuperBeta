import React, { useState, useEffect } from "react";
import { login } from "../utils/auth";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";

//import Login from "../components/authForms/login";
//import SignUp from "../components/authForms/signUp";
import { isAuthenticated } from "../utils/auth";

export default function Auth() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //setLoading(false);
    if (isAuthenticated()) {
      navigate("/");
    }
  },  []);

  /*
  if (loading) {
    return <h2>Loading...</h2>;
  }
  */

  return (
    <div className="App">
      <div className="App-header">
        <h1>Swim App Super Beta</h1>
      </div>
      <div className="App-contents">
        {/*showLoginForm ? <Login /> : <SignUp />*/}
        <Outlet />
      </div>
    </div>
  );
}
