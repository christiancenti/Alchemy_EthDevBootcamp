import { Alchemy, Network } from 'alchemy-sdk';
import { React, useState } from 'react';

import './App.css';

import General from './General';
import LatestBlocks from './LatestBlocks';
import LatestTransactions from './LatestTransactions';
import SearchBlock from './SearchBlock';
import SearchTransaction from './SearchTransaction';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);


function App() {
  const [gasPrice, setGasPrice] = useState(null);
  const [ethereumPrice, setEthereumPrice] = useState(0);
  const [lastBlock, setLastBlock] = useState(null);
  const [latestTransactions, setLatestTransactions ] = useState(null);
  const [blockNumber, setBlockNumber] = useState('');
  const [block, setBlock] = useState();
  const [transactionHash, setTransactionHash] = useState('');
  const [transaction, setTransaction] = useState();

  return (
    <div id='root'>
      <General 
        gasPrice={gasPrice}
        setGasPrice={setGasPrice}
        lastBlock={lastBlock}
        setLastBlock={setLastBlock}
        alchemy={alchemy}
        ethereumPrice={ethereumPrice}
        setEthereumPrice={setEthereumPrice}
      />
      <div className='data-section'>
      <LatestBlocks 
        lastBlock={lastBlock}
        setBlockNumber={setBlockNumber}
      />
      <LatestTransactions
        latestTransactions={latestTransactions}
        setLatestTransactions={setLatestTransactions}
        alchemy={alchemy}
        lastBlock={lastBlock}
        transactionHash={transactionHash}
        setTransactionHash = {setTransactionHash}
        SearchTransaction = {SearchTransaction}
      />
      </div>
      <div className='search-section'>
      <SearchBlock 
        blockNumber={blockNumber}
        setBlockNumber={setBlockNumber}
        block={block}
        setBlock={setBlock}
        alchemy={alchemy}
        setTransactionHash={setTransactionHash}
      />
      <SearchTransaction
        transactionHash={transactionHash}
        setTransactionHash={setTransactionHash}
        transaction={transaction}
        setTransaction={setTransaction}
        alchemy={alchemy}
      />
      </div>
    </div>
  );
}

export default App;
    