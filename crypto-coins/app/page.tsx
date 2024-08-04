import React from 'react'
import { CryptoTable } from './components/CryptoTable';
import { testDatabaseConnection } from "@/app/api/test";

const page = async () => {
  const isConnected = await testDatabaseConnection();
  
  return (
    <div >
      <div className="navbar bg-base-100">
      <div className="navbar-start">
        <img src="assets/logo.png" width={50} height={50} alt="Logo" />
        </div>
        <div className="navbar-center">
          <h2 className="font-bold text-inherit">Crypto Coins Tracker</h2>
        </div>
      </div>
      <CryptoTable></CryptoTable>
      {isConnected ? (
          <h2 className="px-20 text-lg text-green-600">
            You are connected to MongoDB!
          </h2>
        ) : (
          <h2 className="px-20 text-lg text-red-500">
            You are NOT connected to MongoDB.
          </h2>
        )}
    </div>
  )
}

export default page
