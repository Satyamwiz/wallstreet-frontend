import { useState, useEffect } from "react";
import socketService from "../services/socket.js";
import "./HoldingsCard.css";

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

    // Define a market update handler.
    const handleMarketUpdate = (data) => {
      const payload = data;
      console.log(payload);
      setPrices((prevPrices) => ({
        ...prevPrices,
        [payload.company]: Number(payload.price),
      }));
    };

    // Register the market update listener.
    socketService.onMarketUpdate(handleMarketUpdate);

    // Cleanup: remove listeners and disconnect on unmount.
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [holdings]);

  return (
    <div className="holdings-card container mt-5">
      <h2>Your Holdings</h2>
      {holdings.length === 0 ? (
        <p className="text-center">No holdings available</p>
      ) : (
        <div className="holdings-table-container">
          <table className="table table-fixed">
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
                // Use the updated price from state if available; otherwise fallback.
                const currentPrice =
                  prices[holding.companyName] !== undefined
                    ? Number(prices[holding.companyName])
                    : Number(holding.currentPrice);
                const profitLoss =
                  (currentPrice - holding.averagePrice) * holding.quantity;

                return (
                  <tr key={holding.companyName}>
                    <td>{holding.companyName}</td>
                    <td>{holding.quantity}</td>
                    <td>₹ {Number(holding.averagePrice).toFixed(2)}</td>
                    <td>₹ {currentPrice.toFixed(2)}</td>
                    <td style={{ color: profitLoss >= 0 ? "lightgreen" : "red" }}>
                      ₹ {profitLoss.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HoldingsCard;
