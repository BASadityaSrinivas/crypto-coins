'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Coin {
  coin_id: string
  coin_symbol: string;
  coin_name: string;
  subreddit: string;
  image: string;
}

export const CryptoTable = () => {
  const [coinsData, setCoinsData] = useState<Coin[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        const response = await fetch('/api/coins');
        console.log("Fetching the coins data")
        if (response.ok) {
          const data: Coin[] = await response.json();
          setCoinsData(data);
        } else {
          console.error('Failed to fetch coins data');
        }
      } catch (error) {
        console.error('Error fetching coins data:', error);
      }
    };

    fetchCoinsData();
  }, []);

  const handleRowClick = (row: Coin) => {
    router.push(`/coin/${row.coin_id}`);
  };

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
          {coinsData.map(coin => (coin.coin_id ?
            <tr key={coin.coin_id} className="hover:bg-base-300 hover:cursor-pointer" onClick={() => handleRowClick(coin)}>
              <td> 
                <div className='flex place-content-center'>
                  <p>{coin.coin_symbol.toUpperCase()}</p>
                  <img className='ml-5' src={coin.image} alt='coin-img' height={20} width={20}></img>
                </div>
              </td>
              <td className='font-bold'>{coin.coin_name}</td>
              <td>
                <Link href={coin.subreddit} target="_blank">
                  <img className='m-auto' src="/assets/reddit.png" alt='reddit-png' height={20} width={20} />
                </Link>
              </td>
            </tr>
            : 
            <p key="null"></p>
          ))}
        </tbody>
      </table>
    </div>
  );
};
