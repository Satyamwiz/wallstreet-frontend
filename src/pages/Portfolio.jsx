import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import {
  FaWallet,
  FaChartPie,
  FaListAlt,
  FaExchangeAlt,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";
import CompanyWisePnL from "./components/CompanyWisePnL";
import HoldingsCard from "./components/HoldingsCard";
import OrderDetails from "./components/OrderDetails";
import TransactionHistory from "./components/TransactionHistory";
import "./Portfolio.css";

const Portfolio = () => {
  const [cash, setCash] = useState(0);
  const [networth, setNetworth] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [holdings, setHoldings] = useState(null);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("holdings");

  useEffect(() => {
    // Simulating API call delay
    setTimeout(() => {
      // Fetch data from API
      /*
      fetch("YOUR_BACKEND_API_ENDPOINT/portfolio")
        .then((response) => response.json())
        .then((data) => {
          setCash(data.cash);
          setNetworth(data.networth);
          setHoldings(data.holdings);
          setTransactions(data.transactions);
          setPendingTransactions(data.pendingTransactions);
        })
        .catch((error) => console.error("Error fetching portfolio data:", error));
      */

      // Static fallback data (for development/testing)
      setCash(25000.5);
      setNetworth(154300.75);
      setHoldings([
        {
          id: 1,
          stock__ticker: "AAPL",
          total_quantity: 50,
          avg_price: 145.3,
          stock__current_price: 185.45,
          profit_loss: 2007.5,
          trade_type: "delivery",
        },
        {
          id: 2,
          stock__ticker: "TSLA",
          total_quantity: 25,
          avg_price: 220.5,
          stock__current_price: 275.8,
          profit_loss: 1382.5,
          trade_type: "intraday",
        },
        {
          id: 3,
          stock__ticker: "MSFT",
          total_quantity: 40,
          avg_price: 245.75,
          stock__current_price: 310.2,
          profit_loss: 2578.0,
          trade_type: "delivery",
        },
      ]);
      setTransactions([
        {
          id: 1,
          ticker: "AAPL",
          quantity: 10,
          transaction_type: "buy",
          traded_price: 182.5,
          date: "2024-02-01",
          trade_type: "delivery",
        },
        {
          id: 2,
          ticker: "TSLA",
          quantity: 5,
          transaction_type: "sell",
          traded_price: 270.25,
          date: "2024-02-01",
          trade_type: "intraday",
        },
      ]);
      setPendingTransactions([
        {
          id: 1,
          ticker: "MSFT",
          quantity: 15,
          transaction_type: "buy",
          traded_price: 305.0,
          date: "2024-02-02",
          trade_type: "delivery",
        },
        {
          id: 2,
          ticker: "NVDA",
          quantity: 5,
          transaction_type: "sell",
          traded_price: 580.25,
          date: "2024-02-02",
          trade_type: "intraday",
        },
      ]);
    }, 900);
  }, []);

  return (
    <div className="portfolio-container">
      <h3 className="portfolio-title">📊 Portfolio Overview</h3>

      {/* Net Worth & Cash - Always Visible */}
      <div className="overview-cards">
        <div className="overview-card">
          <h5>
            <FaChartPie /> Net Worth
          </h5>
          <p>₹ {networth.toFixed(2)}</p>
        </div>
        <div className="overview-card">
          <h5>
            <FaWallet /> Cash
          </h5>
          <p>₹ {cash.toFixed(2)}</p>
        </div>
      </div>

      {/* Navigation Tabs with Icons */}
      <div className="nav-tabs">
        <button
          className={activeTab === "holdings" ? "active" : ""}
          onClick={() => setActiveTab("holdings")}
        >
          <FaListAlt /> Holdings
        </button>
        <button
          className={activeTab === "pnl" ? "active" : ""}
          onClick={() => setActiveTab("pnl")}
        >
          <FaBuilding /> Company-Wise PnL
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          <FaClipboardList /> Orders
        </button>
        <button
          className={activeTab === "transactions" ? "active" : ""}
          onClick={() => setActiveTab("transactions")}
        >
          <FaExchangeAlt /> Transactions
        </button>
      </div>

      {/* Show Component Based on Selected Tab */}
      {!holdings ? (
        <div className="loader-wrapper">
          <ThreeDots height="55" width="55" color="#5eb5f8" />
        </div>
      ) : (
        <div className="component-container">
          {activeTab === "holdings" && <HoldingsCard holdings={holdings} />}
          {activeTab === "pnl" && <CompanyWisePnL holdings={holdings} />}
          {activeTab === "orders" && (
            <OrderDetails pendingTransactions={pendingTransactions} />
          )}
          {activeTab === "transactions" && (
            <TransactionHistory transactions={transactions} />
          )}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
