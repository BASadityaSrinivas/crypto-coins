import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('crypto_coins');
    const coins = await db.collection('CoinInfo').find({}).toArray();

    return NextResponse.json(coins);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching coins data' }, { status: 500 });
  }
}
