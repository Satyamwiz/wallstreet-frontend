
// import {
//     stockService,
//     portfolioService,
//     marketService,
// } from "../services/apis";
// import {
//     stockService,
//     portfolioService,
//     marketService,
// } from "../services/apis";
import React, { useState, useEffect } from "react";
import BuyModal from "../components/BuyModal";
import SellModal from "../components/SellModal";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "../components/LineChart";
import "./StocksDetail.css"; // Import our custom dark-mode styles

Chart.register(CategoryScale);

// Mock services with extra info (now includes delivery_price_history)
export const stockService = {
  getStockDetail: (id) =>
    Promise.resolve({
      id: id,
      ticker: "AAPL",
      name: "Apple Inc.",
      current_price: 178.45,
      price_change: 2.3,
      // Intraday price history
      price_history: [
        { datetime: "2025-02-01T00:00:00Z", price: 178.45 },
        { datetime: "2025-02-02T00:00:00Z", price: 180.00 },
        { datetime: "2025-02-03T00:00:00Z", price: 182.20 },
        { datetime: "2025-02-04T00:00:00Z", price: 183.50 },
        { datetime: "2025-02-05T00:00:00Z", price: 185.75 },
      ],
      // Delivery (long-term) price history
      delivery_price_history: [
        { datetime: "2025-01-01T00:00:00Z", price: 170.45 },
        { datetime: "2025-01-15T00:00:00Z", price: 172.00 },
        { datetime: "2025-02-01T00:00:00Z", price: 175.20 },
        { datetime: "2025-02-15T00:00:00Z", price: 178.50 },
        { datetime: "2025-03-01T00:00:00Z", price: 180.75 },
      ],
      details:
        "<p>Apple Inc. is a leading technology company known for its innovative products including the iPhone, Mac, and iPad.</p>",
      dividendYield: 1.5,          // in percentage
      dividendPerShare: 0.82,       // in dollars
      exDividendDate: "2025-02-15",
      paymentDate: "2025-03-01",
      marketCap: "2.3T",           // trillion dollars representation
      peRatio: 28.5,
      sector: "Technology",
      industry: "Consumer Electronics",
    }),
};

export const portfolioService = {
  getCash: () => Promise.resolve({ cash: 5000.75 }),
};

export const marketService = {
  checkMarketStatus: () => Promise.resolve({ is_open: true }),
};

const StocksDetail = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [cash, setCash] = useState(0);
  const [availableShares, setAvailableShares] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [isMarketOpen, setIsMarketOpen] = useState(true);
  // New mode state: "intraday" (default) or "delivery"
  const [mode, setMode] = useState("intraday");

  // Fetch stock details once on mount or when id changes
  useEffect(() => {
    setTimeout(() => {
      stockService
        .getStockDetail(id)
        .then((res) => {
          setStock(res);
        })
        .catch((err) => console.log("Error fetching stock details"));

      portfolioService
        .getCash()
        .then((res) => setCash(res.cash))
        .catch((err) => console.log("Error fetching cash"));

      // Mock available shares
      setAvailableShares(100);

      marketService
        .checkMarketStatus()
        .then((res) => setIsMarketOpen(res.is_open))
        .catch((err) => console.log("Error fetching market status"));
    }, 900);
  }, [id]);

  // Update chartData when stock data is available or when mode changes
  useEffect(() => {
    if (stock) {
      const selectedHistory =
        mode === "intraday" ? stock.price_history : stock.delivery_price_history;
      setChartData({
        labels: selectedHistory.map((data) => data.datetime.slice(0, 10)),
        datasets: [
          {
            label: mode === "intraday" ? "Intraday Price" : "Delivery Price",
            data: selectedHistory.map((data) => data.price),
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "#5eb5f8",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [stock, mode]);

  return (
    <div className="stocks-detail-container">
      {!stock && (
        <div className="loader-wrapper">
          <ThreeDots
            height="55"
            width="55"
            color="#5eb5f8"
            ariaLabel="line-wave"
            visible={true}
          />
        </div>
      )}

      {stock && (
        <>
          {/* Header Section */}
          <header className="stock-header">
            <h1 className="stock-title">
              {stock.ticker} - {stock.name}
            </h1>
          </header>

          {/* Toggle Section */}
          <section className="toggle-section">
            <button
              className={`toggle-btn ${mode === "intraday" ? "active" : ""}`}
              onClick={() => setMode("intraday")}
            >
              Intraday
            </button>
            <button
              className={`toggle-btn ${mode === "delivery" ? "active" : ""}`}
              onClick={() => setMode("delivery")}
            >
              Delivery
            </button>
          </section>

          {/* Chart Section */}
          {chartData && (
            <section className="chart-section">
              <LineChart chartData={chartData} />
            </section>
          )}

          {/* Buy/Sell Section */}
          <section className="action-section">
            {isMarketOpen ? (
              <div className="market-actions">
                <button
                  className="btn btn-buy"
                  data-toggle="modal"
                  data-target={`#modal${id}`}
                >
                  Buy
                </button>
                <BuyModal
                  id={stock.id}
                  ticker={stock.ticker}
                  name={stock.name}
                  current_price={stock.current_price}
                  price_change={parseFloat(stock.price_change).toFixed(2)}
                  cash={cash}
                />
                <button
                  className="btn btn-sell"
                  data-toggle="modal"
                  data-target={`#sellmodal${id}`}
                >
                  Sell
                </button>
                <SellModal
                  id={stock.id}
                  ticker={stock.ticker}
                  name={stock.name}
                  current_price={stock.current_price}
                  price_change={parseFloat(stock.price_change).toFixed(2)}
                  shares={availableShares}
                />
              </div>
            ) : (
              <div className="market-closed">
                [Note: The market is currently closed. Trading resumes at 9 AM.]
              </div>
            )}
          </section>

          {/* Additional Info Section */}
          <section className="additional-info-section">
            <h2>Additional Information</h2>
            <div className="info-grid">
              <div className="info-card">
                <strong>Dividend Yield:</strong> {stock.dividendYield}%
              </div>
              <div className="info-card">
                <strong>Dividend Per Share:</strong> ${stock.dividendPerShare}
              </div>
              <div className="info-card">
                <strong>Ex-Dividend Date:</strong> {stock.exDividendDate}
              </div>
              <div className="info-card">
                <strong>Payment Date:</strong> {stock.paymentDate}
              </div>
              <div className="info-card">
                <strong>Market Cap:</strong> {stock.marketCap}
              </div>
              <div className="info-card">
                <strong>P/E Ratio:</strong> {stock.peRatio}
              </div>
              <div className="info-card">
                <strong>Sector:</strong> {stock.sector}
              </div>
              <div className="info-card">
                <strong>Industry:</strong> {stock.industry}
              </div>
            </div>
          </section>

          {/* Stock Details Section */}
          <section className="stock-details-section">
            <div
              className="stock-description"
              dangerouslySetInnerHTML={{ __html: stock.details }}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default StocksDetail;
