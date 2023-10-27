const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const client = new S3Client({ region: "us-east-2" })

function getObject (Bucket, Key) {
        return new Promise(async (resolve, reject) => {
                const getObjectCommand = new GetObjectCommand({ Bucket, Key })

                try {
                        const response = await client.send(getObjectCommand);
                        let responseDataChunks = [];
                        response.Body.once('error', err => reject(err));
                        response.Body.on('data', (chunk) => responseDataChunks.push(chunk));
                        response.Body.once('end', () => resolve(responseDataChunks.join('')));
                        console.log('waddup');
                        console.log(responseDataChunks);
                } catch (err) {
                        return reject(err)
                }
        })
}

//var Bucket = 's3-swim-app-super-beta'
//var Key = 'set_1.html'

/*getObject(Bucket, Key).then(function(result) {
        console.log(result);
});*/

module.exports = { getObject };
