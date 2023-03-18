const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "041f90707d6fa15c1e9cc42d7b41a15242b4f70bee7a09605c8cf7be183a98555be92657d428d38795f9fd318e89fa134c2bb79bb6ff0fc712bb8734103b12e453": 100,
  "0401e8f7266b6409349f058fff0ab9061b4e3674e9db67eb08f476f0885d3d1abd8609a6c48f676492fc344a184d310e38e76c9f41e36e7fd9ae7dba7565395267": 50,
  "0497201d1fbf32489530b31d0db95439d406d2741a6a25a18374c44c76664d9d782fbbdfa08bf1201779110d16a263612c35ff9d300c81446783a061f6fd4d24f2": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const msgHash = keccak256(utf8ToBytes(amount + recipient));

  isValid = secp.verify(Uint8Array.from(Object.values(signature)), msgHash, hexToBytes(sender));

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if(isValid) {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
  else {
    res.status(400).send({ message: 'Signature not valid'})
  }


});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
