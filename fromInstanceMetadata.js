const { fromInstanceMetadata } =  require("@aws-sdk/credential-providers");

const provider = fromInstanceMetadata();

async function test() {
  let cred = await provider();
  console.log(cred);
};

test()
