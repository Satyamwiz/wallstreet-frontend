import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import "./Stocks.css";
import { stockService } from "../services/apis.js";
import  socketService  from "../services/socket.js";

const Stocks = () => {
  const [stocks, setStocks] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Live prices keyed by company name
  const [livePrices, setLivePrices] = useState({});

  // Always use dark mode (no toggle)
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Fetch initial stocks data from backend
  useEffect(() => {
    stockService
      .getStocks()
      .then((res) => {
        // Ensure each stock has a unique id
        const data = res.map((stock, index) => ({
          ...stock,
          id: stock.id || index + 1,
        }));
        setStocks(data);
      })
      .catch(() => console.log("Error fetching stocks"));
  }, []);

  // Setup socket connection for live price updates once stocks are loaded
  useEffect(() => {
    if (!stocks) return;

    // Connect to the socket server
    socketService.connect();

    // Subscribe to updates for each stock (using companyName as identifier)
    stocks.forEach((stock) => {
      socketService.subscribeToCompany(stock.name);
    });

    // Market update handler that updates livePrices state
    const handleMarketUpdate = (data) => {
      let payload = data;
      // If payload is a string, attempt to parse it
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch (err) {
          console.error("Error parsing payload:", err);
          return;
        }
      }
      console.log("Market update:", payload);
      // Update state with the new price.
      // We assume payload.company matches stock.name and payload.price is a number.
      setLivePrices((prev) => ({
        ...prev,
        [payload.company]: Number(payload.price),
      }));
    };

    socketService.onMarketUpdate(handleMarketUpdate);

    // Cleanup on unmount: remove listeners and disconnect
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [stocks]);

  return (
    <div className="stocks-container">
      <h2 className="stocks-heading">Browse the Market</h2>
      <p className="stocks-subheading">
        Explore our selection of the biggest names in the industry.
      </p>

      {/* Search Input */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by ticker, company, or description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Loader */}
      {!stocks ? (
        <div className="loader">
          <ThreeDots height="55" width="55" color="#ff9800" />
        </div>
      ) : (
        <div className="stock-grid">
          {stocks
            .filter(
              (stock) =>
                stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((stock) => {
              // Determine the live price, falling back to the original price if no update yet.
              const updatedPrice = livePrices[stock.name] !== undefined
                  ? livePrices[stock.name]
                  : stock.price;
              // If no price is available, show "N/A"
              const displayPrice =
                updatedPrice !== undefined ? `$${updatedPrice}` : "N/A";

              // Calculate the percentage change from the initial price
              let changePercentage = 0;
              if (stock.price && updatedPrice !== undefined) {
                changePercentage = ((updatedPrice - stock.price) / stock.price) * 100;
              }
              const isPositive = changePercentage >= 0;
              const formattedChange = changePercentage.toFixed(2);

              return (
                <Link
                  to={`/stocksdetail/${stock.id}`}
                  key={stock.id}
                  className="stock-card"
                >
                  <div className="stock-logo">{stock.symbol}</div>
                  <div className="stock-info">
                    <h3>{stock.name}</h3>
                    <p className="stock-exchange">
                      {stock.exchange} &bull; {stock.symbol}
                    </p>
                    <div className="stock-price-wrapper">
                      <span className="stock-price">{displayPrice}</span>
                      <span className={`stock-change ${isPositive ? "green" : "red"}`}>
                        {isPositive ? `+${formattedChange}%` : `${formattedChange}%`}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Stocks;
