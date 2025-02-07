import React from "react";
import Lottie from "lottie-react";
import animationData1 from "../lottie/UpStock.json"; // Up
import animationData2 from "../lottie/DownStock.json"; // Down

const stock = { 
  id: 1, 
  name: "TCS", 
  ticker: "TCS", 
  current_price: 3456.78, 
  change: "+150.45 (4.5%)", 
  color: "text-green-400" 
};

const BuyButton = () => <button className="bg-gray-600 text-gray-400 px-4 py-2 rounded-lg" disabled>BUY</button>;
const SellButton = () => <button className="bg-white text-black px-4 py-2 rounded-lg mx-2">SELL</button>;

const StockCard = () => {
  const isPositive = stock.change.includes("+");

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-6 relative">
      <div className="mt-6 w-full max-w-6xl bg-gray-800 p-6 shadow-md rounded-lg flex">
        <div className="w-3/4 p-4 flex items-center">
          <h2 className="text-2xl font-bold mr-4">{stock.name}</h2>
          <Lottie animationData={isPositive ? animationData1 : animationData2} loop={true} style={{ width: 50, height: 50 }} />
        </div>
        <div className="w-3/4 p-4">
          <p className="text-3xl font-bold mt-2">₹{stock.current_price}</p>
          <p className={stock.color}>{stock.change} 1D</p>
          <div className="mt-4 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">[Stock Chart Placeholder]</p>
          </div>
        </div>

        <div className="w-1/4 ml-6 bg-gray-700 p-4 rounded-lg mx-auto">
          <div className="flex justify-between">
            <BuyButton />
            <SellButton />
          </div>

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
  );
};

export default StockCard;
