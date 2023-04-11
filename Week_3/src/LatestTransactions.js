import { React, useEffect } from 'react';
import { Utils } from 'alchemy-sdk';
    
function LatestTransactions({latestTransactions, setLatestTransactions, alchemy, lastBlock, transactionHash, setTransactionHash}) {
    useEffect(() => {
        async function setTransactions() {
            if(!lastBlock) {
                return
            };

            const params = {
                blockNumber: Utils.hexlify(lastBlock)
            }

            try {
                const response = await alchemy.core.getTransactionReceipts(params);
                const transactions = response.receipts.slice(0, 6).map(x => (({
                    hash: x.transactionHash,
                    from: x.from,
                    to: x.to
                })));
                setLatestTransactions(transactions);
            } catch(error) {
                alert(error)
            }
        };

        setTransactions()
    }, [lastBlock]);

    function handleClick(transaction) {
        setTransactionHash(transaction.hash);
        const button = document.getElementById('TransactionDetails');
        setTimeout(() => {button.click()}, 0);
    }

    return (
    <div className='transaction-section'>
    <h3>Latest transactions</h3>
    <ul>
    {latestTransactions?.map((transaction, index) => (
            <div key={index} style={{marginTop: '20px'}}>
              <strong>Hash:</strong> <a onClick={() => {handleClick(transaction)}}> {transaction.hash} </a> <br/> <strong>From:</strong> {transaction.from} <br/> <strong>To:</strong> {transaction.to}
            </div>
            
          ))}
    </ul>
    </div>
    )
}

export default LatestTransactions;