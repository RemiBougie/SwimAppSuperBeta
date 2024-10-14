const userPoolId = process.env.REACT_APP_USER_POOL_ID;
const clientId = process.env.REACT_APP_CLIENT_ID;
const AWSRegion = process.env.REACT_APP_AWS_REGION;
const oauthDomain = process.env.REACT_APP_OAUTH_DOMAIN;
const redirectSignIn = process.env.REACT_APP_REDIRECT_SIGNIN;
const redirectSignOut = process.env.REACT_APP_REDIRECT_SIGNOUT;

export const awsConfig = {
    region: AWSRegion,
    userPoolId: userPoolId,
    clientId: clientId,
    oauth: {
        domain: oauthDomain,
        redirectSignIn: redirectSignIn,
        redirectSignOut: redirectSignOut,
        responseType: 'code',
        scope: ['email', 'openid', 'profile'],
    },
}