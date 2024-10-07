import React, { useState } from "react";
import AWS from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_JdjrKNjPr",
  ClientId: "2mdjgoaquj0fhdji40dqjicafk",
};

const userPool = new CognitoUserPool(poolData);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const tokens = await loginHelper(username, password);
      console.log("Login successful!", tokens);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="Login" onSubmit={handleLogin}>
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
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <button>Login with Google</button>
      <button>Login with Facebook</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

function loginHelper(username, password) {
  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        console.log("Access Token: ", accessToken);
        console.log("ID Token: ", idToken);
        console.log("Refresh Token: ", refreshToken);

        resolve({
          accessToken,
          idToken,
          refreshToken,
        });
      },

      onFailure: (err) => {
        console.error(
          "Authentication Error: ",
          err.message || JSON.stringify(err)
        );
        reject(err);
      },
    });
  });
}

// command + shift + P
