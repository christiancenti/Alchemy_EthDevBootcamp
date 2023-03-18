import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        publicKey={publicKey}
        setPublicKey={setPublicKey}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        signature = {signature}
        setSignature = {setSignature}
      />
      <Transfer setBalance={setBalance} publicKey={publicKey} privateKey={privateKey} signature = {signature} setSignature = {setSignature}/>
    </div>
  );
}

export default App;

//vedere se riesco ad usare gli address piuttosto che la public.