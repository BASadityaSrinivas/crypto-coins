import React from 'react'
import { CryptoTable } from './components/CryptoTable';

const page = () => {
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
    </div>
  )
}

export default page
