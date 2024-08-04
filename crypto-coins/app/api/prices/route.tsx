import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

let cachedData: { [key: string]: any } = {};
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30 * 1000;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coinId = searchParams.get('coin_id');
  if (!coinId) {
    return NextResponse.json({ message: 'coin_id is required' }, { status: 400 });
  }

  const cacheKey = `${coinId}_latest_prices`;
  const now = Date.now();

  console.log("time cache diff: ", now - cacheTimestamp, CACHE_DURATION);

  if (cachedData[cacheKey] && (now - cacheTimestamp < CACHE_DURATION)) {
    return NextResponse.json(cachedData[cacheKey]);
  }

  try {
    const client = await clientPromise;
    const db = client.db('crypto_coins');
    const prices = await db
      .collection('CoinPriceTrack')
      .find({ coin_id: coinId })
      .sort({ created_ts: -1 })
      .limit(20)
      .toArray();

    console.log("Made DB call for ", coinId);

    cachedData[cacheKey] = prices;
    cacheTimestamp = now;

    return NextResponse.json(prices);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching prices data' }, { status: 500 });
  }
}
