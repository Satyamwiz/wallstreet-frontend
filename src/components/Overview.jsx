import { useEffect, useState } from "react";
import socketService from "../services/socket.js";
import SellModal from "./SellModal.jsx";

const OverviewComponent = ({ stock }) => {
  // Initialize state with the stock's current price and default range values.
  const [prices, setPrices] = useState(stock.price);
  const [todaysMin, settodayMin] = useState(0);
  const [todaysMax, settodayMax] = useState(0);
  const [clampedTodaysPos, setClampedTodaysPos] = useState(0);
  const [buyVolume, setBuyVolume] = useState(0);
  const [sellVolume, setSellVolume] = useState(0);

  // Effect for establishing the WebSocket connection and subscribing to events.
  useEffect(() => {
    // Connect to the socket server and subscribe to the specific company's updates.
    socketService.connect();
    socketService.subscribeToCompany(stock.name);
    console.log("Subscribed to stock:", stock);

    // Handler to update the current price.
    const handleMarketUpdate = (data) => {
      setPrices(Number(data.price));
    };

    // Handler to update buy volume.
    const handleBuyVolume = (data) => {
      // Parse the incoming data.
      
     console.log(data);
      // Log the parsed value directly.
      console.log("Parsed Buy Volume:", Number(data.buy_volume));
      setBuyVolume(Number(data.buy_volume));
    };

    // Handler to update sell volume.
    const handleSellVolume = (data) => {
      
      
      setSellVolume(Number(data.sell_volume));
      console.log(sellVolume);
    };

    // Handler to update today's low price.
    const handleMinUpdate = (data) => {
      console.log("Received min update:", data);
      settodayMin(Number(data.low_price));
    };

    // Handler to update today's high price.
    const handleMaxUpdate = (data) => {
      console.log("Received max update:", data);
      settodayMax(Number(data.high_price));
    };

    // Register the event handlers.
    socketService.onMarketUpdate(handleMarketUpdate);
    socketService.onnonupdates(handleMinUpdate);
    socketService.onupdates(handleMaxUpdate);

    // Subscribe to volume updates.
    // Assuming getvolume returns buy volume and get2volume returns sell volume.
    socketService.getvolume(handleBuyVolume);
    socketService.get2volume(handleSellVolume);

    // Cleanup: remove listeners and disconnect when the component unmounts.
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [stock]);

  // Effect to recalculate the current price's position within today's range.
  useEffect(() => {
    if (todaysMax !== todaysMin) {
      const todaysPosition = ((prices - todaysMin) / (todaysMax - todaysMin)) * 100;
      setClampedTodaysPos(Math.max(0, Math.min(100, todaysPosition)));
    }
  }, [prices, todaysMin, todaysMax]);

  // Optional: useEffect to log buyVolume when it changes.
  useEffect(() => {
    console.log("Updated buyVolume:", buyVolume);
  }, [buyVolume]);

  return (
    <div className="overview-component">
      {/* Today's Range Display */}
      <div className="info-card range-card">
        <h3>Today's Range</h3>
        <div className="range-slider">
          <div className="range-values">
            <span>${todaysMin.toFixed(2)}</span>
            <span>${todaysMax.toFixed(2)}</span>
          </div>
          <div className="range-bar">
            <div className="range-progress" style={{ width: `${clampedTodaysPos}%` }}></div>
            <div className="range-marker" style={{ left: `${clampedTodaysPos}%` }}></div>
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
