import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, GoogleSignIn } from "../../utils/auth";
import Modal from "../modal";
import ConfirmationCode from "./confirmationCode";
import { exchangeAuthCodeForTokens, getAuthCodeFromUrl } from "../../utils/token";

import { awsConfig } from "../../aws-config";

// Login form
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  //const history = useHistory();
  const navigate = useNavigate();

  const openModal = () => {
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("Handle login called.");

    try {
      const tokens = await login(
        username,
        password,
        showNewPassword ? newPassword : null
      );
      console.log("Login successful!", tokens);
      // to do: set up protected route to navigate to after successful login
      //history.push('/BrowseSwimSets');
      navigate("/");
    } catch (err) {
      if (err.message === "New password is required") {
        setShowNewPassword(true);
      } else if (err.message === "User is not confirmed.") {
        openModal();
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("AWS CONFIG: ", awsConfig);
    const authCode = getAuthCodeFromUrl();

    if (authCode) {
        exchangeAuthCodeForTokens(authCode)
        .then((tokens) => {
            localStorage.setItem("accessToken", tokens.access_token);
            localStorage.setItem("idToken", tokens.id_token);
            localStorage.setItem("refreshToken", tokens.refresh_token)
            window.history.replaceState({}, document.title, "/");
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.error('Error exchanging tokens: ', err));
    }
  }, []);

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>

        {showNewPassword && (
          <>
            <p>You must reset your password. </p>
            <div>
              <label>Set new password: </label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label>Confirm new password: </label>
              <input
                onChange={(e) =>
                  setPasswordsMatch(e.target.value === newPassword)
                }
              />
            </div>

            {!passwordsMatch ? <p>Passwords do not match.</p> : null}
          </>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <br />
        <button
            onClick={(e) => {
                e.preventDefault();
                GoogleSignIn();
            }}>Login with Google</button>
        <br />
        <button>Login with Facebook</button>
        <br />
        <button
          onClick={() => {
            navigate("SignUp");
          }}
        >
          Create Account
        </button>

        {error && <p className="error">{error}</p>}
      </form>
      <Modal isOpen={modalVisibility} onClose={closeModal} componentToRender={<ConfirmationCode username={username} password={password}/>}/>
    </>
  );
}
