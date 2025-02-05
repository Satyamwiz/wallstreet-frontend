import React from "react";
import { useState } from "react";

const StockCard = ({ id, name, ticker, current_price, change, color }) => {
  
  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-6">
      <div className="mt-6 w-full max-w-6xl bg-gray-800 p-6 shadow-md rounded-lg flex">
        <div className="w-3/4 p-4">
          <h2 className="text-2xl font-bold">Company Name</h2>
          <p className="text-3xl font-bold mt-2">₹2345.07</p>
          <p className="text-green-400">+176.89 (4.5%) 1D</p>
          <div className="mt-4 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">[Stock Chart Placeholder]</p>
          </div>
        </div>

        <div className="w-1/4 ml-6 bg-gray-700 p-4 rounded-lg mx-auto">
          <div className="flex justify-between">
            <button className="bg-gray-600 text-gray-400 px-4 py-2 rounded-lg" disabled>BUY</button>
            <button className="bg-white text-black px-4 py-2 rounded-lg">SELL</button>
          </div>

          <div className="flex justify-end">
            <div className="mt-4">
              <label className="block font-semibold px-3 w-full mb-2">Type</label>
              <select className="w-full border p-2 rounded-md mt-1 text-black">
                <option>Delivery</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block font-semibold px-3 w-full">Shares</label>
              <input type="number" className="w-full border p-1 rounded-md mt-1 text-black" defaultValue="1" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StockCard;
