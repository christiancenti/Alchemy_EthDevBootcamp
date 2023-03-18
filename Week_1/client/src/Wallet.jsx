import server from "./server";

function Wallet({ publicKey, setPublicKey, balance, setBalance, privateKey, setPrivateKey, setSignature }) {
  async function onChange(evt) {
    setSignature("");
    const publicKey = evt.target.value;
    setPublicKey(publicKey);
    if (publicKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function setPrivate(event) {
    setSignature("");
    const privateKey = event.target.value;
    setPrivateKey(privateKey);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public Key
        <input placeholder="Type your public key" value={publicKey} onChange={onChange}></input>
      </label>

      <label>
        Private Key
        <input placeholder="Type your private key" value={privateKey} onChange={setPrivate}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
