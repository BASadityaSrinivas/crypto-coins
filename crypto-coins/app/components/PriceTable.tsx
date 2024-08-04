'use client';

import React, { useEffect, useState } from 'react';

interface CoinPrice {
  coin_id: string;
  usd_price: number;
  usd_latest_details: number;
  created_ts: EpochTimeStamp;
}

interface PriceTableProps {
  coinId: string;
}

export const PriceTable = ({ coinId }: PriceTableProps) => {
  const [coinPrices, setCoinPrices] = useState<CoinPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPricesData = async () => {
      console.log("Coin ID: ", coinId)
      try {
        const response = await fetch(`/api/prices?coin_id=${coinId}`);
        if (response.ok) {
          const data: CoinPrice[] = await response.json();
          console.log(data)
          setCoinPrices(data);
        } else {
          console.error('Failed to fetch prices data');
        }
      } catch (error) {
        console.error('Error fetching prices data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricesData();
  }, [coinId]);

  function epochToJsDate(ts: EpochTimeStamp) {
    let utcString = new Date(ts).toUTCString();
    return utcString.slice(4, -4);
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    }).format(amount);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <table className='table table-sm mx-20 mt-8 p-10 table-pin-rows'>
        <thead>
          <tr>
            <th>USD Price</th>
            <th>Date & Time (UTC ±0:00)</th>
          </tr>
        </thead>
        <tbody>
          {coinPrices.map((currentPrice, index) => (
            <tr key={index} className="hover:bg-base-content hover:text-[white]">
              <td className='font-bold'>{formatCurrency(currentPrice.usd_price || currentPrice.usd_latest_details)}</td>
              <td>{epochToJsDate(currentPrice.created_ts)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;