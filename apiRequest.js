const http = require('http');
const https = require('https');
const { createRequest } = require('./createRequest.js');

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

// CREATE SIGNED REQUEST TO API GATEWAY AND SEND
const options = {
  hostname: 'wkx8abizkk.execute-api.us-east-2.amazonaws.com',
  path: '/dev/s3GetObj-Test',
  method: 'GET',
  protocol: 'https:',
  headers: {
    'Content-Type': 'application/json',
    host: 'wkx8abizkk.execute-api.us-east-2.amazonaws.com'
  }
};
createRequest(options).then((signedReq) => {
  console.log(signedReq);
  apiRequest(signedReq);
});
