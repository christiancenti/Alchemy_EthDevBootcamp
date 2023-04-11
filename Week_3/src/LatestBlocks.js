import { React } from 'react';
    
function LatestBlocks({lastBlock, setBlockNumber}) {
        
    function handleClick(block) {
        setBlockNumber(block);
        const button = document.getElementById('blockDetails');
        setTimeout(() => {button.click()}, 0);
    }

    return (
        <div className='block-section'>
            <h3>Latest Blocks</h3>
                <a onClick={() => {handleClick(lastBlock)}}> {lastBlock} </a> <br/>
                <a onClick={() => {handleClick(lastBlock - 1)}}> {lastBlock - 1} </a> <br/>
                <a onClick={() => {handleClick(lastBlock - 2)}}> {lastBlock - 2} </a> <br/>
                <a onClick={() => {handleClick(lastBlock - 3)}}> {lastBlock - 3} </a> <br/>
                <a onClick={() => {handleClick(lastBlock - 4)}}> {lastBlock - 4} </a> <br/>
                <a onClick={() => {handleClick(lastBlock - 5)}}> {lastBlock - 5} </a> <br/>
        </div>
    )
}

export default LatestBlocks;