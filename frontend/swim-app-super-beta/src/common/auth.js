import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

const userPoolId = process.env.REACT_APP_USER_POOL_ID;
const clientId = process.env.REACT_APP_CLIENT_ID;

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

const userPool = new CognitoUserPool(poolData);

export function login(username, password, newPassword = null) {
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

  console.log("loginHelper called.");
  console.log("username: ", username);
  console.log("password: ", password);
  console.log("newPassword: ", newPassword);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("idToken", idToken);

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

      newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log("new password required");
        console.log("userAttributes: ", userAttributes);

        delete userAttributes["email"];
        delete userAttributes["email_verified"];

        if (newPassword) {
          cognitoUser.completeNewPasswordChallenge(
            newPassword,
            userAttributes,
            {
              onSuccess: (result) => {
                const accessToken = result.getAccessToken().getJwtToken();
                const idToken = result.getIdToken().getJwtToken();
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("idToken", idToken);
                resolve(result);
              },
              onFailure: (err) => {
                reject(err);
              },
            }
          );
        } else {
          // If new password is required but not provided yet, reject with an error
          reject({ message: "New password is required" });
        }
      },
    });
  });
}

export function logout() {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
  }
}

export function isAuthenticated() {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
}

/*
function validatePassword(password) {
    let errors = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long")
    }

    let matches = password.match(/(\d+)/);
    if (!matches) {
        errors.push("Password must contain at least one number.")
    }
};
*/

export function signUp(username, password, email) {
    //const isValidPassword = validatePassword(password);
    return new Promise((resolve, reject) => {
        const attributeList = [
            {
                Name: 'email',
                Value: email,
            },
        ];

        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

export function confirmRegistration(username, confirmationCode) {
    const userData = {
        Username: username,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })

}