'use client';
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation'

interface Coin {
  symbol: string;
  name: string;
  subreddit: string;
}

const coinsInfo = [{"symbol": "btc", "name": "Bitcoin", "subreddit": "https://www.reddit.com/r/Bitcoin/"},
                   {"symbol": "eth", "name": "Ethereum", "subreddit": "https://www.reddit.com/r/ethereum/"}];

export const CryptoTable = () => {
  const coinsData: Coin[] = coinsInfo;
  
  const router = useRouter();
  const handleRowClick = (row: Coin) => {
    router.push(`/coin/${row.symbol}`);
  }  

  return (
    <div className="flex">
    <table className='table m-20 p-10 table-pin-rows'>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Reddit</th>
        </tr>
      </thead>
      <tbody>
      {coinsData.map(coin => 
        <tr className="hover:bg-base-300 hover:cursor-pointer" onClick={() => {handleRowClick(coin)}}>
          <td>{coin.symbol.toUpperCase()}</td>
          <td>{coin.name}</td>
          <td>
            <Link href={coin.subreddit}> 
              <img className='m-auto'  src="assets/reddit.png" alt='reddit-png' height={20} width={20}/>
            </Link>
          </td>
        </tr>
    )}
        {/* <tr className="hover">
          <td>BTC</td>
          <td>Bitcoin</td>
        </tr>
        <tr className="hover">
          <td>ETH</td>
          <td>Ethereum</td>
        </tr> */}
      </tbody>
    </table>
    </div>
  )
}
