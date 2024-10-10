import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signUp } from "../../common/auth";
import ConfirmationCode from "./confirmationCode";
import Modal from "../modal";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("username: ", username);
      console.log("email: ", email);
      console.log("password: ", password);
      const result = await signUp(username, password, email);
      openModal();
      //navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="[\p{L}\p{M}\p{S}\p{N}\p{P}]+"
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
          />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            onChange={(e) => {
              setPasswordsMatch(e.target.value === password);
            }}
          />
        </div>
        {!passwordsMatch ? <p>Passwords do not match.</p> : null}
        <button type="submit">Sign Up</button>
        <button>Sign Up with Google</button>
        <button
            onClick={()=>openModal()}>Enter a confirmation code (enter username and password first)</button>

        <p>Password requirements: </p>
        <ul style={{ "flex-direction": "column" }}>
          <li>At least 8 characters long</li>
          <li>Must contain at least one number</li>
          <li>Must contain at least one lowercase letter</li>
          <li>Must contain at least one uppercase letter</li>
          <li>Must contain at least one special character</li>
        </ul>

        {error && <p className="error">{error}</p>}
      </form>
      <Modal isOpen={modalVisibility} onClose={closeModal} componentToRender={<ConfirmationCode username={username} password={password}/>} />
    </>
  );
}
