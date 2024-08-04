import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import fetch from 'node-fetch';

const COINS = process.env.COINS;
const API_KEY = process.env.COINGECKO_API_KEY;
const API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${COINS}&vs_currencies=usd&precision=full`;

const pollInterval = 60000;

let isPolling = false;

interface CoinPriceData {
  usd: number;
}

interface PricesData {
  [coinId: string]: CoinPriceData;
}

async function fetchCoinPrices(): Promise<PricesData> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'x-cg-demo-api-key': API_KEY as string,
    },
  });
  const data: any = await response.json();
  return data as PricesData;
}

async function updateCoinPrices() {
  try {
    const pricesData: PricesData = await fetchCoinPrices();
    const client = await clientPromise;
    const db = client.db('crypto_coins');
    const collection = db.collection('CoinPriceTrack');
    const timestamp = new Date();

    console.log("Latest pricesData: ", pricesData);

    const insertOperations = Object.keys(pricesData as any).map((coinId) => ({
      coin_id: coinId,
      usd_price: pricesData[coinId].usd,
      created_ts: timestamp,
    }));

    await collection.insertMany(insertOperations);

  } catch (error) {
    console.error('Error updating coin prices:', error);
  }
}

function startPolling() {
  if (!isPolling) {
    isPolling = true;
    setInterval(updateCoinPrices, pollInterval);
    console.log("Started Polling!!!");
  }
}

export async function GET() {
  startPolling();
  return NextResponse.json({ message: 'Polling started' });
}
