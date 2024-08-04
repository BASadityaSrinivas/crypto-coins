import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import fetch from 'node-fetch';

const COINS = process.env.COINS?.split(',') || [];
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  links: {
    subreddit_url?: string;
  };
  image: {
    small: string;
  };
}

interface CoinPrice {
  prices: [number, number][];
}

const initializeDatabase = async () => {
  console.log("Inside initializeDatabase")
  const client = await clientPromise;
  const db = client.db('crypto_coins');

  const collections = await db.collections();
  const collectionNames = collections.map(col => col.collectionName);

  if (!collectionNames.includes('CoinInfo')) {
    await db.createCollection('CoinInfo');
  }
  if (!collectionNames.includes('CoinPriceTrack')) {
    await db.createCollection('CoinPriceTrack');
  }
};

const fetchCoinData = async (coin: string): Promise<{ coinInfo: CoinInfo; coinPrice: CoinPrice }> => {
  console.log("Fetching coin data for coin: ", coin);
  
  const coinInfoResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`, {
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': COINGECKO_API_KEY as string,
    },
  });
  const coinInfo: CoinInfo = await coinInfoResponse.json() as CoinInfo;

  const now = Math.floor(Date.now() / 1000);
  const fourHoursAgo = now - 4 * 60 * 60;

  const coinPriceResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${fourHoursAgo}&to=${now}`, {
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': COINGECKO_API_KEY as string,
    },
  });
  const coinPrice: CoinPrice = await coinPriceResponse.json() as CoinPrice;

  return { coinInfo, coinPrice };
};


const saveCoinData = async (coin: string) => {
  const client = await clientPromise;
  const db = client.db('crypto_coins');
  const { coinInfo, coinPrice } = await fetchCoinData(coin);

  const coinInfoDoc = {
    coin_id: coinInfo.id,
    coin_name: coinInfo.name,
    coin_symbol: coinInfo.symbol,
    subreddit: coinInfo?.links?.subreddit_url || `https://www.google.com/search?q={coinInfo.id}`,
    image: coinInfo?.image?.small,
    created_ts: new Date(),
  };

  if(coinInfo.id) {
    await db.collection('CoinInfo').updateOne(
      { coin_id: coinInfo.id },
      { $set: coinInfoDoc },
      { upsert: true }
    );
  }


  if(coinInfo.id) { 
    console.log(coinInfo.id, coinPrice.prices[0], coinPrice.prices[coinPrice.prices.length-1])
    const coinPriceDocs = coinPrice.prices.slice(-20).map((price: [number, number]) => ({
      coin_id: coinInfo.id,
      usd_price: price[1],
      created_ts: new Date(price[0]),
    }));
    await db.collection('CoinPriceTrack').insertMany(coinPriceDocs);
  }
};

export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();
    for (const coin of COINS) {
      await saveCoinData(coin);
    }
    return NextResponse.json({ message: 'Database initialized and data fetched!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error initializing database and fetching data' }, { status: 500 });
  }
}
