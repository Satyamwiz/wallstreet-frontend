import { useState, useEffect } from "react";
import socketService from "../services/socket.js";

const HoldingsCard = ({ holdings = [] }) => {
  // State to store each company's latest price.
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // Connect to the socket server when the component mounts.
    socketService.connect();

    // Subscribe to updates for each company.
    holdings.forEach((holding) => {
      socketService.subscribeToCompany(holding.companyName);
    });

    // Define a single market update handler.
    const handleMarketUpdate = (data) => {
      let payload = data;
      
      // Check if data is a string; if so, parse it, otherwise assume it's already an object.
     
        
          
          console.log(payload);
        
      

      // Validate payload structure.
      // if (!payload.companyName || typeof payload.price !== "number") return;

      // Update the state with the new price.
      setPrices((prevPrices) => ({
        ...prevPrices,
        [payload.company]: Number(payload.price),
      }));
      // console.log("chechking", payload.companyName,"lala",payload.price);
    };

    // Register the market update listener.

    socketService.onMarketUpdate(handleMarketUpdate);

    // Cleanup: remove listeners and disconnect on unmount.
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [holdings]); // Depend on `holdings` to re-subscribe if holdings change.

  return (
    <div className="container mt-5">
      <h3 className="text-light mb-4 text-center">Your Holdings</h3>
      {holdings.length === 0 ? (
        <p className="text-light">No holdings available</p>
      ) : (
        <table className="table text-light text-center table-fixed">
          <thead>
            <tr style={{ color: "#5eb5f8" }}>
              <th scope="col">Company</th>
              <th scope="col">Quantity</th>
              <th scope="col">Avg. Price</th>
              <th scope="col">Current Price</th>
              <th scope="col">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => {
              // Use the updated price from state if available;
              // otherwise, fallback to the initial stock__current_price.
              const currentPrice =
                Number(prices[holding.companyName]).toFixed(2) || 0;
              const profitLoss =
                (currentPrice - holding.averagePrice) * holding.quantity;

              return (
                <tr key={holding.companyName}>
                  <td>{holding.companyName}</td>
                  <td>{holding.quantity}</td>
                  <td>₹ {Number(holding.averagePrice).toFixed(2)}</td>
                  <td>₹ {Number(currentPrice).toFixed(2)}</td>
                  <td style={{ color: profitLoss >= 0 ? "lightgreen" : "red" }}>
                    ₹ {profitLoss.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HoldingsCard;