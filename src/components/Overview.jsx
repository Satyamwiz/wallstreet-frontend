import React, { useEffect, useState } from "react";
import socketService from "../services/socket.js";

const OverviewComponent = ({ stock }) => {
  // Use stock.price as the initial value for currentPrice.
  const [currentPrice, setCurrentPrice] = useState(stock.price);
  const [todaysMin, setTodaysMin] = useState(0);
  const [todaysMax, setTodaysMax] = useState(0);
  const [clampedTodaysPos, setClampedTodaysPos] = useState(0);
  const [buyVolume, setBuyVolume] = useState(0);
  const [sellVolume, setSellVolume] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Establish the websocket connection and subscribe to events.
  useEffect(() => {
    socketService.connect();
    socketService.subscribeToCompany(stock.name);
    console.log("Subscribed to stock:", stock);

    // Update current price.
    const handleMarketUpdate = (data) => {
      // Ensure data.price exists
      if (data.price) {
        setCurrentPrice(Number(data.price));
      }
    };

    // Update today's low price.
    const handleMinUpdate = (data) => {
      console.log("Received min update:", data);
      if (data.low_price) {
        setTodaysMin(Number(data.low_price));
      }
    };

    // Update today's high price.
    const handleMaxUpdate = (data) => {
      console.log("Received max update:", data);
      if (data.high_price) {
        setTodaysMax(Number(data.high_price));
      }
    };

    // Update volume values.
    const handleBuyVolume = (data) => {
      console.log("Buy volume update:", data);
      if (data.buy_volume) {
        setBuyVolume(Number(data.buy_volume));
      }
    };

    const handleSellVolume = (data) => {
      console.log("Sell volume update:", data);
      if (data.sell_volume) {
        setSellVolume(Number(data.sell_volume));
      }
    };

    // Register event handlers.
    socketService.onMarketUpdate(handleMarketUpdate);
    socketService.onnonupdates(handleMinUpdate);
    socketService.onupdates(handleMaxUpdate);
    socketService.getvolume(handleBuyVolume);
    socketService.get2volume(handleSellVolume);

    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [stock]);

  // Recalculate the slider position when currentPrice, todaysMin, or todaysMax changes.
  useEffect(() => {
    if (todaysMax !== todaysMin) {
      const pos = ((currentPrice - todaysMin) / (todaysMax - todaysMin)) * 100;
      setClampedTodaysPos(Math.max(0, Math.min(100, pos)));
    }
  }, [currentPrice, todaysMin, todaysMax]);

  return (
    <div className="overview-component">
      {/* Today's Range Display */}
      <div className="info-card range-card">
        <h3>Today's Range</h3>
        <div
          className="range-slider"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Custom tooltip on hover */}
          {isHovered && (
            <div className="tooltip">
              Current Price: ${currentPrice.toFixed(2)}
            </div>
          )}
          <div className="range-values">
            <span>${todaysMin.toFixed(2)}</span>
            <span>${todaysMax.toFixed(2)}</span>
          </div>
          <div className="range-bar">
            <div
              className="range-progress"
              style={{ width: `${clampedTodaysPos}%` }}
            ></div>
            <div
              className="range-marker"
              style={{ left: `${clampedTodaysPos}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Key Statistics Display */}
      <div className="info-grid">
        <div className="info-card">
          <strong>Market Cap</strong>
          <span>{stock.marketCap || "NA"}</span>
        </div>
        <div className="info-card">
          <strong>Buy Volume</strong>
          <span>{buyVolume}</span>
        </div>
        <div className="info-card">
          <strong>Sell Volume</strong>
          <span>{sellVolume}</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewComponent;
