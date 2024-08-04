'use client';
import PriceTable from '@/app/components/PriceTable';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

interface Coin {
  coin_id: string;
  coin_symbol: string;
  coin_name: string;
  subreddit: string;
  image: string;
}

export default function CoinData() {
  const params = useParams<{ symbol: string }>();
  const [coinData, setCoinData] = useState<Coin | null>(null);
  const router = useRouter();

  console.log("Params: ", params);

  useEffect(() => {
    const fetchCoinsData = async () => {
      if (!params.symbol) {
        console.error('No symbol provided');
        return;
      }
      
      try {
        const response = await fetch('/api/coins');
        if (response.ok) {
          const data: Coin[] = await response.json();
          const coin = data.find(coin => coin.coin_id === params.symbol);
          console.log("coin ", coin)
          setCoinData(coin || null);
        } else {
          console.error('Failed to fetch coins data');
        }
      } catch (error) {
        console.error('Error fetching coins data:', error);
      }
    };

    fetchCoinsData();
  }, [params.symbol]);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  const handleOnClick = () => {
    router.push('/');
  };

  return (
    <div>
      <div key={coinData.coin_symbol}>
        <button className='rounded-md ml-20 mt-16 pl-6 pr-8 py-2 bg-base-300' onClick={handleOnClick}>
          <img src="/assets/chevron-left.png" alt="Logo" height={30} width={30} />
        </button>
        <div className='flex ml-5 mt-5'>
          <h1 className='text-3xl font-bold mt-5 ml-20'>{coinData.coin_symbol.toUpperCase()}</h1>
          <img className='ml-5 mt-2' src={coinData.image} alt='coin-img' height={20} width={60}></img>
        </div>
        
        <h2 className='text-large font-bold ml-10 mt-5 px-16 text-[#1f7e7e]'>{coinData.coin_name}</h2>
        <div className='flex flex-wrap-reverse ml-10 px-16 pr-52 mt-2'>
          <p className='text-medium font-semibold'>SubReddit: </p>
          <div className='flex-auto w-64 grow-0 shrink'> 
            <Link href={coinData.subreddit} target="_blank"> 
              <img className='ml-10' src="/assets/reddit.png" alt="reddit-png" height={20} width={20}/>
            </Link>
          </div>
        </div>
      </div>
      <PriceTable coinId={coinData.coin_id} />
    </div>
  );
}
