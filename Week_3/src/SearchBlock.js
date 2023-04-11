import React from 'react';
import { Utils } from 'alchemy-sdk';

function SearchBlock({ blockNumber, setBlockNumber, block, setBlock, setTransactionHash, alchemy }) {
  async function searchData() {
    const blockNumberHex = Utils.hexlify(Number(blockNumber));
    const blockData = await alchemy.core.getBlock(blockNumberHex);
    setBlock([blockData]);
  }

  function handleClick(transaction) {
    setTransactionHash(transaction);
    const button = document.getElementById('TransactionDetails');
    setTimeout(() => {button.click()}, 0);
}

  return (
    <div className="search-block">
      <label>
      <strong> Search Block </strong>
        <input
          placeholder="Block number"
          value={blockNumber}
          onChange={(event) => setBlockNumber(event.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <button id='blockDetails' style={{ marginLeft: '10px' }} onClick={searchData}>
          Search
        </button>
      </label>
      {block?.map((blockData, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <strong> Number: </strong> {blockData.number} <br /> <strong> Hash: </strong> {blockData.hash} <br /> <strong> Timestamp: </strong> {blockData.timestamp} <br /> <strong> Miner: </strong> {blockData.miner} <br />
          <strong> Transactions list:  </strong> 
            {blockData.transactions &&
              blockData.transactions.map((transaction, index) => (
                <div key={index}>
                  <strong>{index}</strong>: <a onClick={() => {handleClick(transaction)}}> {transaction} </a>
                </div>
              ))}
        </div>
      ))}
    </div>
  );
}


export default SearchBlock;

