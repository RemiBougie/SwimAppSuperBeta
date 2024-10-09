import React, { useState } from "react";
import { login } from "../common/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Login form
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const history = useHistory();
  const navigate = useNavigate();

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
      navigate("/BrowseSwimSets");
    } catch (err) {
      if (err.message === "New password is required") {
        setShowNewPassword(true);
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="App-contents">
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
          <button>Login with Google</button>
          <button>Login with Facebook</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
