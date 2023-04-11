import { Utils } from 'alchemy-sdk';
import { React, useEffect } from 'react';

const criptocompareApi = process.env.REACT_APP_CRYPTOCOMPARE_API_KEY;

    
function General({gasPrice, setGasPrice, lastBlock, setLastBlock, alchemy, ethereumPrice, setEthereumPrice}) {

    //TODO: eth price
    useEffect(() => {
        async function fetchData() {
            try {
                const [gasPrice, currentBlock] = await Promise.all([
                    alchemy.core.getGasPrice(),
                    alchemy.core.getBlockNumber(),
                ]);
                setGasPrice(parseFloat(Utils.formatUnits(gasPrice, 'gwei')).toFixed(2));
                setLastBlock(currentBlock);
            } catch (error) {
                alert(error);
            }
        }

        fetchData();

        async function getEthereumPrice() {
            const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${criptocompareApi}`);
            const data = await response.json();
            setEthereumPrice(data.USD);
        }
        getEthereumPrice();

    }, []);
    
    return (
    <div className='info-section'>
    <h2>Gas price: {gasPrice} Gwei </h2>
    <h2>ETH price: {ethereumPrice} USD </h2>
    <h2>Last finalized block: {lastBlock} </h2>
    </div>
    )
}

export default General;