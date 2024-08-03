'use client';
import PriceTable from '@/app/components/PriceTable';
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation'

interface Coin {
  symbol: string;
  name: string;
  subreddit: string;
}

const coinsInfo = [{"symbol": "btc", "name": "Bitcoin", "subreddit": "https://www.reddit.com/r/Bitcoin/"}];


export default function CoinData({params}: any) {

  const coinsData: Coin[] = coinsInfo;

  const router = useRouter();
  const handleOnClick = () => {
    router.push('/');
  }  

  return (
    <div>
      {coinsData.map(coin => 
        <div>
          <button className='rounded-md ml-20 mt-16 pl-6 pr-8 py-2 bg-base-300' onClick={handleOnClick}>
            <img src="/assets/chevron-left.png" alt="Logo" height={30} width={30} />
          </button>
          <h1 className='text-3xl font-bold ml-5 px-16 mt-5'>{coin.symbol.toUpperCase()}</h1>
          <h2 className='text-large font-bold ml-10 mt-5 px-16 text-[#1f7e7e]'>{coin.name}</h2>
          <div className='flex flex-wrap-reverse ml-10 px-16 pr-52 mt-2'>
            <p className='text-medium font-semibold'>SubReddit: </p>
            <div className='flex-auto w-64 grow-0 shrink'> 
            <Link href={coin.subreddit}> 
                <img className='ml-10' src="/assets/reddit.png" alt="reddit-png" height={20} width={20}/>
            </Link>
              </div>
          </div>
        </div>
      )}
      <PriceTable/>
    </div>
  )}