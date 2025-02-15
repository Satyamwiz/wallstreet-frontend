import { useEffect, useState } from "react";
import socketService from "../services/socket.js";

const OverviewComponent = ({ stock }) => {
  // Initialize state with the stock's current price and default range values.
  const [prices, setPrices] = useState(stock.price);
  const [todaysMin, settodayMin] = useState(0);
  const [todaysMax, settodayMax] = useState(0);
  const [clampedTodaysPos, setClampedTodaysPos] = useState(0);
  const [volume,setvolume]=useState(0);
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

    const printdata=(data)=>{
      setvolume(Number(data.buy_volume));
    }

  


    // Handler to update today's low price.
    const handleMinUpdate = (data) => {
      console.log("Received min update:", data);
      // Ensure that low_price represents the day's minimum value.
      settodayMin(Number(data.low_price));
    };

    // Handler to update today's high price.
    const handleMaxUpdate = (data) => {
      console.log("Received max update:", data);
      // Ensure that high_price represents the day's maximum value.
      settodayMax(Number(data.high_price));
    };

    // Register the event handlers.
    socketService.onMarketUpdate(handleMarketUpdate);
    socketService.onnonupdates(handleMinUpdate);
    socketService.onupdates(handleMaxUpdate);
    socketService.get2volume(printdata);
    socketService.getvolume(printdata);
    // Cleanup: remove listeners and disconnect when the component unmounts.
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [stock]);

  // Effect to recalculate the current price's position within today's range.
  useEffect(() => {
    // Guard against division by zero by ensuring a valid range.
    

    if (todaysMax !== todaysMin) {
      const todaysPosition = ((prices - todaysMin) / (todaysMax - todaysMin)) * 100;
      setClampedTodaysPos(Math.max(0, Math.min(100, todaysPosition)));
    }
  }, [prices, todaysMin, todaysMax]);

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
            {/* The progress bar's width and marker's left offset correspond to the calculated percentage */}
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
// import { useEffect, useState } from "react";
// import socketService from "../services/socket.js";

// const OverviewComponent = ({ stock }) => {
//   // Initialize state with the stock's current price and default range values.
//   const [prices, setPrices] = useState(stock.price);
//   const [todaysMin, settodayMin] = useState(stock.price);
//   const [todaysMax, settodayMax] = useState(stock.price);
//   const [clampedTodaysPos, setClampedTodaysPos] = useState(0);
//   const [volume, setvolume] = useState(0);

//   // On mount, restore today's min and max from localStorage if available.
//   useEffect(() => {
//     const storedMin = localStorage.getItem(`todaysMin_${stock.name}`);
//     const storedMax = localStorage.getItem(`todaysMax_${stock.name}`);
//     if (storedMin !== null && storedMax !== null) {
//       settodayMin(Number(storedMin));
//       settodayMax(Number(storedMax));
//     } else {
//       // If no stored values, initialize with current price.
//       settodayMin(stock.price);
//       settodayMax(stock.price);
//     }
//   }, [stock.name, stock.price]);

//   // Persist today's min and max values to localStorage whenever they change.
//   useEffect(() => {
//     localStorage.setItem(`todaysMin_${stock.name}`, todaysMin);
//     localStorage.setItem(`todaysMax_${stock.name}`, todaysMax);
//   }, [todaysMin, todaysMax, stock.name]);

//   useEffect(() => {
//     // Connect to the socket server and subscribe to the specific company's updates.
//     socketService.connect();
//     socketService.subscribeToCompany(stock.name);
//     console.log("Subscribed to stock:", stock);

//     // Handler to update the current price.
//     const handleMarketUpdate = (data) => {
//       setPrices(Number(data.price));
//     };

//     // Handler to update volume remains as-is.
//     const printdata = (data) => {
//       setvolume(Number(data.buy_volume));
//     };

//     // Register the market update handler.
//     socketService.onMarketUpdate(handleMarketUpdate);

//     // Commenting out websocket-based min and max updates.
//     // const handleMinUpdate = (data) => {
//     //   console.log("Received min update:", data);
//     //   settodayMin(Number(data.low_price));
//     // };
//     // const handleMaxUpdate = (data) => {
//     //   console.log("Received max update:", data);
//     //   settodayMax(Number(data.high_price));
//     // };
//     // socketService.onnonupdates(handleMinUpdate);
//     // socketService.onupdates(handleMaxUpdate);
    
//     socketService.get2volume(printdata);
//     socketService.getvolume(printdata);

//     // Cleanup: remove listeners and disconnect when the component unmounts.
//     return () => {
//       socketService.removeListeners();
//       socketService.disconnect();
//     };
//   }, [stock]);

//   // Update today's min and max based on price changes.
//   useEffect(() => {
//     settodayMin((prevMin) => Math.min(prevMin, prices));
//     settodayMax((prevMax) => Math.max(prevMax, prices));
//   }, [prices]);

//   // Recalculate the current price's position within today's range.
//   useEffect(() => {
//     if (todaysMax !== todaysMin) {
//       const todaysPosition = ((prices - todaysMin) / (todaysMax - todaysMin)) * 100;
//       setClampedTodaysPos(Math.max(0, Math.min(100, todaysPosition)));
//     }
//   }, [prices, todaysMin, todaysMax]);

//   return (
//     <div className="overview-component">
//       {/* Today's Range Display */}
//       <div className="info-card range-card">
//         <h3>Today's Range</h3>
//         <div className="range-slider">
//           <div className="range-values">
//             <span>${Number(todaysMin).toFixed(2)}</span>
//             <span>${Number(todaysMax).toFixed(2)}</span>
//           </div>
//           <div className="range-bar">
//             {/* The progress bar's width and marker's left offset correspond to the calculated percentage */}
//             <div className="range-progress" style={{ width: `${clampedTodaysPos}%` }}></div>
//             <div className="range-marker" style={{ left: `${clampedTodaysPos}%` }}></div>
//           </div>
//         </div>
//       </div>

//       {/* Key Statistics Display */}
//       <div className="info-grid">
//         <div className="info-card">
//           <strong>Market Cap</strong>
//           <span>{stock.marketCap || "NA"}</span>
//         </div>
//         <div className="info-card">
//           <strong>Volume</strong>
//           <span>{stock.volume || "NA"}</span>
//         </div>
//         <div className="info-card">
//           <strong>P/E Ratio (TTM)</strong>
//           <span>{stock.peRatio || "NA"}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewComponent;
