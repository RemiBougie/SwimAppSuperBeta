const http = require('http');
const https = require('https');
const { createRequest } = require('./createRequest.js');

// CREATE SIGNED REQUEST TO API GATEWAY
const options = {
  hostname: 'wkx8abizkk.execute-api.us-east-2.amazonaws.com',
  path: '/dev/test',
  method: 'GET',
  protocol: 'https:',
  headers: {
    'Content-Type': 'application/json',
    host: 'wkx8abizkk.execute-api.us-east-2.amazonaws.com'
  }
};
const signedReq = createRequest(options);

async function apiRequest (signedRequest) {
  return new Promise((resolve, reject) => {
    const apiRequest = https.request(signedRequest, (response) => {
      response.setEncoding("utf8");
      let responseBody = "";
  
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
  
      response.on("end", () => {
        console.log(responseBody);
        resolve(JSON.stringify(responseBody));
      });
    });
  
    apiRequest.on("error", (err) => {
      reject(err);
    });
  
    apiRequest.end();
  });
}

apiRequest(options);
