const https = require('https');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { fromNodeProviderChain, fromInstanceMetadata } = require('@aws-sdk/credential-providers');
const crt = require('@aws-sdk/signature-v4-crt');
const { Hash } = require('@aws-sdk/hash-node');

async function createRequest (options) {
  // GET CREDENTIALS FROM ENV VARIABLES
  //const provider = fromNodeProviderChain()
  /*const provider = fromTemporaryCredentials({
    RoleArn: 'arn:aws:iam::363528306897:role/SwimAppEC2Role',
    RoleSessionName: 'aws-sdk-js-test',
    DurationSeconds: 3600})*/
  //const provider = fromInstanceMetadata()
  //const cred = await provider()
  const url = 'http://169.254.169.254/latest/meta-data/iam/security-credentials/SwimAppEC2Role'
  let cred;
  https.get(url, (response) => {
    let data ="";
    response.on('data',(chunk) => {
      data += chunk;
    });
    
    response.on('end',() => {
      console.log(data);
      cred = JSON.parse(data);
    });

    response.on('error', (err) => {
      console.error(`Error retrieving data:${err}`);
    });
  });

  // SHA256 HASH CONSTRUCTOR USING SECRET ACCESS KEY
  const SHA256 = new Hash('sha256', cred.secretAccessKeyId)

  // CREATING SIGNER
  const crtSignerInit = {
    credentials: cred,
    region: 'us-east-2',
    service: 'execute-api',
    applyChecksum: false,
    sha256: SHA256,
    signingAlgorithm: 'SigV4',
    uriEscapePath: true
  }
  const crtSigner = new crt.CrtSignerV4(crtSignerInit)

  // SIGN HTTP REQUEST
  const signedReq = await crtSigner.sign(options)

  return signedReq;
}

module.exports = { createRequest };
