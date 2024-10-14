import axios from 'axios';

import { awsConfig } from "../aws-config";

export function getAuthCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
}

export async function exchangeAuthCodeForTokens(authCode) {
    console.log("AWS CONFIGURATION: ", awsConfig)

    const tokenUrl = `https://${awsConfig.oauth.domain}/oauth2/token`;

    const data = {
        grant_type: 'authorization_code',
        client_id: awsConfig.clientId,
        redirect_uri: awsConfig.oauth.redirectSignIn,
        code: authCode,
    }

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    const response = await axios.post(tokenUrl, new URLSearchParams(data), { headers });
    return response.data;
}