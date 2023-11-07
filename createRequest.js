const https = require('https');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { fromNodeProviderChain, fromInstanceMetadata } = require('@aws-sdk/credential-providers');
const crt = require('@aws-sdk/signature-v4-crt');
const { Hash } = require('@aws-sdk/hash-node');

async function createRequest (options) {
  // GET AWS CREDENTIALS FROM EC2 INSTANCE METADATA
  const provider = fromInstanceMetadata();
  const cred = await provider();
  console.log(cred);

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
