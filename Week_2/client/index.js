const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('readline');

const serverUrl = 'http://localhost:1225';

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let name;

  rl.question("Which name do you want to proof that is in the list? ", (answer) => {
    name = answer;
    rl.close();
  });

  // Wait for user to input their name
  await new Promise(resolve => rl.on('close', resolve));

  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  console.log(merkleTree.getRoot())

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: name,
    proof: proof,
  });

  console.log({ gift });
}

main();