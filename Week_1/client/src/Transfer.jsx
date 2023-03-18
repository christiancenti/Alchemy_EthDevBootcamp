import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";


function Transfer({ privateKey, publicKey, setBalance, signature, setSignature }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [msgHash, setMsgHash] = useState("");

  const setValue = (setter) => (evt) => {
    setter(evt.target.value);
    setSignature("");
  }

  async function signTransfer() {
    const msgHash = keccak256(utf8ToBytes(sendAmount + recipient));
    setMsgHash(msgHash);
    try {
      const signature = await secp.sign(msgHash, privateKey);
      setSignature(signature);
    } catch(err) {
      alert(err)
    }
  }

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: publicKey,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        msgHash,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type a public key"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      {signature ? (
        <button type="submit" className="button">Transfer</button>
        ) : (
        <button type= "button" className="button" onClick={signTransfer} >Sign</button>
        )}

    </form>
  );
}

export default Transfer;
