import React, { useState, useEffect } from "react";
import BuyModal from "../components/BuyModal";
import SellModal from "../components/SellModal";
import { useParams, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Chart from "chart.js/auto";
import { Activity, TrendingUp, DollarSign, Building, History } from "lucide-react";
import { CategoryScale } from "chart.js";
import LineChart from "../components/LineChart";
import "./StocksDetail.css"; // Custom dark-mode & grow page styles
import TransactionHistory from "../components/TransactionHistory.jsx";
import Overview from "../components/Overview.jsx";
import { portfolioService, stockService } from "../services/apis.js";
import { toast } from "react-toastify";
Chart.register(CategoryScale);

// Mock service for market status (includes delivery_price_history)
export const marketService = {
  checkMarketStatus: () => Promise.resolve({ is_open: true }),
};

const StocksDetail = () => {
  const { name } = useParams();
  
  const location = useLocation();
  const passedState = location.state;
  
  // Initialize with passed state if available; otherwise, null
  const [stock, setStock] = useState(passedState?.stock || null);
  const [cash, setCash] = useState(0);
  const [availableShares, setAvailableShares] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [isMarketOpen, setIsMarketOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [min, setMin] = useState(passedState?.min ?? 0);
  const [max, setMax] = useState(passedState?.max ?? 1000);

  // Fetch stock details if not available via state
  useEffect(() => {
    // console.log(passedState.stock.name);
    setStock(passedState.stock)
    if (!passedState || !passedState.stock) {
      stockService
        .getStockDetail(stock.name)
        .then((res) => {
          console.warn("hi");
          console.log("details",res);
          setStock(res);
        })
        .catch((err) => console.log("Error fetching stock details", err));
    }

    // setStock({
    //   id: 1,
    //   ticker: "AAPL",
    //   name: "Apple Inc.",
    //   current_price: 150.00,
    //   price_change: 1.25,
    //   shares: 50,
    //   marketCap: "2.5T",
    //   peRatio: 28.5,
    //   roe: 35.0,
    //   bookValue: 20.0,
    //   faceValue: 0.5,
    //   debtToEquity: 1.2,
    //   industryPE: 30.0,
    //   epsTTM: 5.25,
    //   dividendYield: 0.6,
    //   dividendPerShare: 0.88,
    //   exDividendDate: "2024-01-15",
    //   paymentDate: "2024-02-01",
    //   dividendFrequency: "Quarterly",
    //   details: "<p>Apple Inc. is an American multinational technology company headquartered in Cupertino, California.</p>",
    //   parentOrganization: "Apple Inc.",
    //   foundedIn: "1976",
    //   lineOfBusiness: "Consumer Electronics",
    //   ceo: "Tim Cook",
    //   delivery_price_history: [
    //   { datetime: "2024-01-01", price: 145.00 },
    //   { datetime: "2024-01-02", price: 146.50 },
    //   { datetime: "2024-01-03", price: 148.00 },
    //   { datetime: "2024-01-04", price: 149.50 },
    //   { datetime: "2024-01-05", price: 150.00 },
    //   ],
    // });
    // Fetch cash and other details regardless of state
    portfolioService
      .getCash()
      .then((res) => {
        
        setCash(res.cash)
      })
      .catch((err) => toast.error("Error fetching cash", err));

    // Set available shares and mock transactions
    setAvailableShares(100);
    

    // setTransactions([
    //   {
    //     id: 1,
    //     ticker: "AAPL",
    //     quantity: 10,
    //     transaction_type: "buy",
    //     traded_price: 182.5,
    //     date: "2024-02-01",
    //     trade_type: "delivery",
    //   },
    // ]);

    // Check market status
    marketService
      .checkMarketStatus()
      .then((res) => setIsMarketOpen(res.is_open))
      .catch((err) => console.log("Error fetching market status", err));
  }, [name, passedState]);

  // Update chartData when stock data is available
  useEffect(() => {
    if (stock && stock.delivery_price_history) {
      const selectedHistory = stock.delivery_price_history;
      setChartData({
        labels: selectedHistory.map((data) => data.datetime.slice(0, 10)),
        datasets: [
          {
            label: "Delivery Price",
            data: selectedHistory.map((data) => data.price),
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "#5eb5f8",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [stock]);

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
               {stock.name}
            </h1>
          </header>

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
                  onClick={() => setShowBuyModal(true)}
                  data-toggle="modal"
                  data-target={`#modal${stock.name}`}
                >
                  Buy
                </button>
                <button
                  className="btn btn-sell"
                  onClick={() => setShowSellModal(true)}
                  data-toggle="modal"
                  data-target={`#sellmodal${stock.name}`}
                >
                  Sell
                </button>
              </div>
            ) : (
              <div className="market-closed">
                [Note: The market is currently closed. Trading resumes at 9 AM.]
              </div>
            )}
          </section>

          {/* Modals */}
          {showBuyModal && (
            <BuyModal
              id={stock.id}
              cash={cash}
              name={stock.name}
             
              price={stock.price}
              price_change={stock.price_change}
              onClose={() => setShowBuyModal(false)}
            />
          )}
          {showSellModal && (
            <SellModal
              id={stock.id}
              ticker={stock.ticker}
              name={stock.name}
              shares={stock.shares}
              price={stock.price}
              price_change={stock.price_change}
              onClose={() => setShowSellModal(false)}
            />
          )}

          {/* Navigation Tabs */}
          <nav className="tab-navigation">
            <button
              onClick={() => setActiveTab("overview")}
              className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            >
              <Activity className="tab-icon" size={20} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("fundamentals")}
              className={`tab-button ${activeTab === "fundamentals" ? "active" : ""}`}
            >
              <TrendingUp className="tab-icon" size={20} />
              Fundamentals
            </button>
            <button
              onClick={() => setActiveTab("dividends")}
              className={`tab-button ${activeTab === "dividends" ? "active" : ""}`}
            >
              <DollarSign className="tab-icon" size={20} />
              Dividends
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`tab-button ${activeTab === "about" ? "active" : ""}`}
            >
              <Building className="tab-icon" size={20} />
              About Company
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`tab-button ${activeTab === "transactions" ? "active" : ""}`}
            >
              <History className="tab-icon" size={20} />
              Transactions
            </button>
          </nav>

          {/* Content Sections */}
          <div className="content-section">
            {activeTab === "overview" && <Overview stock={stock} />}
            {activeTab === "fundamentals" && (
              <div className="fundamentals-section info-grid">
                <div className="info-card">
                  <strong>Market Cap</strong>
                  <span>{stock.marketCap || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>P/E Ratio (TTM)</strong>
                  <span>{stock.peRatio || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>ROE</strong>
                  <span>{stock.roe ? `${stock.roe}%` : "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Book Value</strong>
                  <span>{stock.bookValue || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Face Value</strong>
                  <span>{stock.faceValue || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Debt to Equity</strong>
                  <span>{stock.debtToEquity || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Industry P/E</strong>
                  <span>{stock.industryPE || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>EPS (TTM)</strong>
                  <span>{stock.epsTTM || "NA"}</span>
                </div>
              </div>
            )}
            {activeTab === "dividends" && (
              <div className="dividends-section info-grid">
                <div className="info-card">
                  <strong>Dividend Yield</strong>
                  <span>{stock.dividendYield ? `${stock.dividendYield}%` : "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Dividend Per Share</strong>
                  <span>{stock.dividendPerShare ? `$${stock.dividendPerShare}` : "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Ex-Dividend Date</strong>
                  <span>{stock.exDividendDate || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Payment Date</strong>
                  <span>{stock.paymentDate || "NA"}</span>
                </div>
                <div className="info-card">
                  <strong>Dividend Frequency</strong>
                  <span>{stock.dividendFrequency || "NA"}</span>
                </div>
              </div>
            )}
            {activeTab === "about" && (
              <div className="about-section">
                <div className="info-card">
                  <div
                    className="company-description"
                    dangerouslySetInnerHTML={{ __html: stock.details }}
                  />
                  <div className="company-info">
                    <div>
                      <strong>Parent Organisation</strong>
                      <span>{stock.parentOrganization || "NA"}</span>
                    </div>
                    <div>
                      <strong>Founded In</strong>
                      <span>{stock.foundedIn || "NA"}</span>
                    </div>
                    <div>
                      <strong>Line of Business</strong>
                      <span>{stock.lineOfBusiness || "NA"}</span>
                    </div>
                    <div>
                      <strong>CEO/MD</strong>
                      <span>{stock.ceo || "NA"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "transactions" && (
              <div className="transactions-section">
                <TransactionHistory transactions={transactions} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StocksDetail;
