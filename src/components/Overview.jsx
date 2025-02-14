import { useEffect, useState } from "react";
import socketService from "../services/socket.js";

const OverviewComponent = ({ stock }) => {
  // Initialize with the stock's current price.
  const [prices, setPrices] = useState(stock.current_price);

  useEffect(() => {
    // Connect to the WebSocket server and subscribe to the company's market updates.
    socketService.connect();
    socketService.subscribeToCompany(stock.name);

    // Log stock data for debugging.
    console.log("data", stock);

    // Handler for market updates: update the 'prices' state with the latest price.
    const handleMarketUpdate = (data) => {
      setPrices(Number(data.price));
    };

    // Register the handler for market update events.
    socketService.onMarketUpdate(handleMarketUpdate);

    // Cleanup: remove listeners and disconnect on component unmount.
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [stock]);

  /*** Today's Range ***/
  // Define static endpoints for today's range.
  const todaysMin = 100;
  const todaysMax = 1000;
  // Calculate the percentage position of the current price within today's range.
  // Formula: ((currentPrice - min) / (max - min)) * 100.
  const todaysPosition = ((prices - todaysMin) / (todaysMax - todaysMin)) * 100;
  // Clamp the position between 0 and 100.
  const clampedTodaysPos = Math.max(0, Math.min(100, todaysPosition));

  /*** All Time Range ***/
  // Define the range endpoints based on the initial current price.
  // (These values can be replaced with actual all-time low/high values if available.)
  // const allTimeMin = stock.current_price - 10;
  // const allTimeMax = stock.current_price + 10;
  // Calculate the current price's position within the all-time range.
  // const allTimePosition = ((prices - allTimeMin) / (allTimeMax - allTimeMin)) * 100;
  // const clampedAllTimePos = Math.max(0, Math.min(100, allTimePosition));

  return (
    <div className="overview-component">
      {/* Today's Range */}
      <div className="info-card range-card">
        <h3>Today's Range</h3>
        <div className="range-slider">
          <div className="range-values">
            <span>${todaysMin}</span>
            <span>${todaysMax}</span>
          </div>
          <div className="range-bar">
            {/* The width of the progress bar is set to the calculated percentage */}
            <div className="range-progress" style={{ width: `${clampedTodaysPos}%` }}></div>
            {/* The marker's position is set to the same percentage */}
            <div className="range-marker" style={{ left: `${clampedTodaysPos}%` }}></div>
          </div>
        </div>
      </div>

      {/* All Time Range */}
      {/* <div className="info-card range-card">
        <h3>All Time Range</h3>
        <div className="range-slider">
          <div className="range-values">
            <span>${100}</span>
            <span>${1000}</span>
          </div>
          <div className="range-bar">
            <div className="range-progress" style={{ width: `${clampedAllTimePos}%` }}></div>
            <div className="range-marker" style={{ left: `${clampedAllTimePos}%` }}></div>
          </div>
        </div>
      </div> */}

      {/* Key Statistics */}
      <div className="info-grid">
        <div className="info-card">
          <strong>Market Cap</strong>
          <span>{stock.marketCap || "NA"}</span>
        </div>
        <div className="info-card">
          <strong>Volume</strong>
          <span>{stock.volume || "NA"}</span>
        </div>
        <div className="info-card">
          <strong>P/E Ratio (TTM)</strong>
          <span>{stock.peRatio || "NA"}</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewComponent;
