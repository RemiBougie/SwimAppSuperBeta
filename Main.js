const http = require('http');
const https = require('https');
const { createRequest } = require('./createRequest.js');
const { apiRequest } = require('./apiRequest.js');

// CREATE SIGNED REQUEST TO API GATEWAY
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
//const signedReq = createRequest(options);

http.createServer( (req, res) => {
  let body = [];

  req.on('error', err => {
    console.error(err);
  });

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    body = Buffer.concat(body).toString();
    res.on('error', err => {
      console.error(err);
    });

    let value = 'Just a test value!';

    createRequest(options)
      // SEND SIGNED REQUEST TO API GATEWAY AND GET RESPONSE
      .then((signedRequest) => {
        return apiRequest(signedRequest);
      })
      // RETURN RESPONSE TO THE BROWSER
      .then((apiResponse) => {
        //console.log("VALUES: ", values);
        //console.log("SIGNED REQUEST: ", JSON.stringify(signedReq));
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write('Hello World! Quick change');
        res.write(JSON.stringify(apiResponse));
        res.write(JSON.stringify(value));
        res.end();
    });
  });
  //});
/*
  let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF
 
        response.on('error', err => {
          console.error(err);
        });

  let Bucket = 's3-swim-app-super-beta';
  let Key = 'set_1.html';

  let apiRequest = createRequest(options);
  console.log(apiRequest);
/*
  const apiResponse = new Promise((resolve, reject) => {
    const request = https.request(apiRequest, (response) => {
      response.setEncoding("utf8");
      let responseBody = "";

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        resolve(JSON.parse(responseBody));
      });
    });

    request.on("error", (err) => {
      reject(err);
    });

    request.end();
  });

  console.log(apiResponse);

  res.write(apiResponse)
*/
}).listen(8080);
