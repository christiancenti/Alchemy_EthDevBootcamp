import React from 'react';

function SearchTransaction({transactionHash, setTransactionHash, transaction, setTransaction, alchemy}) {

    async function searchData() { 
        const transactionData = await alchemy.core.getTransactionReceipt(transactionHash)
        setTransaction([transactionData])
    }

    return (
        <div className='search-transaction'>
          <label>
          <strong> Search Transaction </strong>
            <input placeholder="Transaction hash" value = {transactionHash} onChange={n => setTransactionHash(n.target.value)} style={{marginLeft: '10px'}}></input>
            <button id='TransactionDetails' style={{marginLeft: '10px'}} onClick={searchData}>Search</button>
          </label>
          {transaction?.map((data, index) => (
          <div key={index} style={{marginTop: '20px'}} >
              <strong>To:</strong> {data.to}  <br/>  <strong>From:</strong> {data.from} <br/>  <strong>Transaction index:</strong> {data.transactionIndex} <br/>  <strong>Block Number:</strong> {data.blockNumber} <br/>  <strong>Confirmation:</strong> {data.confirmations} <br/>
            </div>
            ))}
        </div>
    );

}

export default SearchTransaction;

