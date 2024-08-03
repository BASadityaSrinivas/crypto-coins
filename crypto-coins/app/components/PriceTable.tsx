import React from 'react'

interface CoinPrice {
  symbol: string;
  usd_price: number;
  btc_price: number;
  eth_price: number;
  timestamp: EpochTimeStamp;
}

const btc_coinPrices = [{symbol: "btc", usd_price: 23327.3237, btc_price: 1.0, eth_price: 987.23, timestamp: 1722686392},
                        {symbol: "btc", usd_price: 23326.3237, btc_price: 1.0, eth_price: 986.23, timestamp: 1722676392},
                        {symbol: "btc", usd_price: 23325.3237, btc_price: 1.0, eth_price: 985.23, timestamp: 1722666392},
                        {symbol: "btc", usd_price: 23324.3237, btc_price: 1.0, eth_price: 984.23, timestamp: 1722656392},
                        {symbol: "btc", usd_price: 23323.3237, btc_price: 1.0, eth_price: 983.23, timestamp: 1722646392}];


const PriceTable = () => {
  const coinPrices: CoinPrice[] = btc_coinPrices;

  function epochToJsDate(ts: EpochTimeStamp){
    let utcString = new Date(ts*1000).toUTCString();
    return utcString.slice(4, -4);
}

  return (
    <div className="flex">
      <table className='table table-sm mx-20 mt-8 p-10 table-pin-rows'> 
        <thead>
          <tr>
            <th>USD Price</th>
            <th>BTC Price</th>
            <th>ETH Price</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {coinPrices.map(currentPrice => 
            <tr className="hover:bg-base-content hover:text-[white]">
              <td>{currentPrice.usd_price}</td>
              <td>{currentPrice.btc_price}</td>
              <td>{currentPrice.eth_price}</td>
              <td>{epochToJsDate(currentPrice.timestamp)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}

export default PriceTable