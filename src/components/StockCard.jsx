import React from "react";
import Lottie from "lottie-react";
import { useState } from "react";
import animationData1 from "../lottie/UpStock.json"; // Up
import animationData2 from "../lottie/DownStock.json"; // Down

const stock = {
  id: 1,
  name: "TCS",
  ticker: "TCS",
  current_price: 3456.78,
  change: "+150.45 (4.5%)",
  color: "text-green-400",
};

const companyDetails = [
  "TCS is a leading global IT services company.",

  "Headquartered in India, it operates in over 46 countries.",

  "Provides consulting and business solutions.",

  "Part of the Tata Group, India's largest business conglomerate.",
];

const BuyButton = () => (
  <button className="bg-gray-600 text-gray-400 px-4 py-2 rounded-lg" disabled>
    BUY
  </button>
);
const SellButton = () => (
  <button className="bg-white text-black px-4 py-2 rounded-lg mx-2">
    SELL
  </button>
);

const StockCard = () => {
  const isPositive = stock.change.includes("+");
  const [showDetails, setShowDetails] = useState(false);

  return (
    // <div className="flex flex-row items-center bg-gray-900 text-white min-h-screen p-6 relative mx-auto">
    <div>
      <div className="mt-6 w-full max-w-6xl bg-gray-800 text-white p-6 shadow-md rounded-lg d-flex flex-row mx-auto p-4">
        {/* Stock Name and Animation */}
        {/* <div className="w-3/4 p-4 flex flex-row items-center gap-2"> */}

        <div className="mt-4 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <h1 className="text-white font-bold m-0 whitespace-nowrap shrink-0">
            {stock.name}
          </h1>
          <div className="w-3/4 p-4">
          <p className="text-3xl font-bold mt-2">₹{stock.current_price}</p>
          <p className={stock.color}>{stock.change} 1D</p>
        </div>
        </div>

        <div className="mt-4 px-2 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <Lottie
            animationData={isPositive ? animationData1 : animationData2}
            loop={true}
            style={{ width: 50, height: 50 }} // Match the container size
          />
        </div>

        {/* Stock Details */}
        
        <div className="mt-4 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">[Stock Chart Placeholder]</p>
        </div>

        {/* Buy/Sell Section */}
        <div className="w-1/4 ml-6 bg-gray-700 p-4 rounded-lg mx-auto">
          <div className="mt-4">
            <label className="block font-semibold px-3 w-full mb-2">Type</label>
            <select className="w-full border p-2 rounded-md mt-1 text-black">
              <option>Delivery</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block font-semibold px-3 w-full">Shares</label>
            <input
              type="number"
              className="w-full border p-1 rounded-md mt-1 text-black"
              defaultValue="1"
            />
          </div>

          <div className="flex justify-between py-4">
            <BuyButton />
            <SellButton />
          </div>
        </div>

        
      </div>
      <div className="mt-4 text-white mx-4">
          <button
            className="w-full bg-gray-600 text-black px-4 py-2 rounded-lg"
            onClick={() => setShowDetails(!showDetails)}
          >
            About Company ▼
          </button>

          {showDetails && (
            <ul className="mt-2 bg-gray-800 p-3 rounded-lg">
              {companyDetails.map((detail, index) => (
                <li key={index} className="text-gray-300 text-sm mb-1">
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>
    // </div>
  );
};

export default StockCard;
