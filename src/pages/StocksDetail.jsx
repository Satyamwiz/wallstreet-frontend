import React, { useState, useEffect } from "react";
import BuyModal from "../components/BuyModal";
import SellModal from "../components/SellModal";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Chart from "chart.js/auto";
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, DollarSign, Building } from 'lucide-react';
import { CategoryScale } from "chart.js";
import LineChart from "../components/LineChart";
import "./StocksDetail.css"; // Custom dark-mode & grow page styles

Chart.register(CategoryScale);

// Mock services with extra info (now includes delivery_price_history)
export const stockService = {
  getStockDetail: (id) =>
    Promise.resolve({
      id: id,
      ticker: "AAPL",
      name: "Apple Inc.",
      current_price: 118.45,
      price_change: 2.3,
      // Intraday price history (no longer used)
      price_history: [
        { datetime: "2025-02-01T00:00:00Z", price: 178.45 },
        { datetime: "2025-02-02T00:00:00Z", price: 180.00 },
        { datetime: "2025-02-03T00:00:00Z", price: 182.20 },
        { datetime: "2025-02-04T00:00:00Z", price: 183.50 },
        { datetime: "2025-02-05T00:00:00Z", price: 185.75 },
      ],
      // Delivery (long-term) price history used for the chart
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
  const [activeTab, setActiveTab] = useState('overview');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  // Fetch stock details on mount or when id changes
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

  // Update chartData when stock data is available
  // Only delivery_price_history is used since intraday is removed
  useEffect(() => {
    if (stock) {
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
              {stock.ticker} - {stock.name}
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
                  data-toggle="modal"
                  onClick={() => setShowBuyModal(true)}
                  data-target={`#modal${id}`}
                >
                  Buy
                </button>
                {/* <BuyModal
                  id={stock.id}
                  ticker={stock.ticker}
                  name={stock.name}
                  current_price={stock.current_price}
                  price_change={parseFloat(stock.price_change).toFixed(2)}
                  cash={cash}
                /> */}
                <button
                  className="btn btn-sell"
                  data-toggle="modal"
                  onClick={() => setShowSellModal(true)}
                  data-target={`#sellmodal${id}`}
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
           {/* Conditionally render the BuyModal */}
           {showBuyModal && (
            <BuyModal
              id={stock.id}
              ticker={stock.ticker}
              name={stock.name}
              cash={cash}
              current_price={stock.current_price+10}
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
              current_price={stock.current_price+10}
              price_change={stock.price_change}
              onClose={() => setShowSellModal(false)}
            />
          )}
          

         

            {/* Navigation Tabs */}
      <nav className="tab-navigation">
        <button
          onClick={() => setActiveTab('overview')}
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <Activity className="tab-icon" size={20} />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('fundamentals')}
          className={`tab-button ${activeTab === 'fundamentals' ? 'active' : ''}`}
        >
          <TrendingUp className="tab-icon" size={20} />
          Fundamentals
        </button>
        <button
          onClick={() => setActiveTab('dividends')}
          className={`tab-button ${activeTab === 'dividends' ? 'active' : ''}`}
        >
          <DollarSign className="tab-icon" size={20} />
          Dividends
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
        >
          <Building className="tab-icon" size={20} />
          About Company
        </button>
      </nav>

      {/* Content Sections */}
<div className="content-section">
  {activeTab === 'overview' && (
    <div className="overview-section">
      {/* Today's Range */}
      <div className="info-card range-card">
        <h3>Today's Range</h3>
        <div className="range-slider">
          <div className="range-values">
            <span>${(stock.current_price - 10).toFixed(2)}</span>
            <span>${(stock.current_price + 10).toFixed(2)}</span>
          </div>
          <div className="range-bar">
            <div className="range-progress" style={{ width: '60%' }}></div>
            <div className="range-marker" style={{ left: '60%' }}></div>
          </div>
        </div>
      </div>
      {/* All Time Range */}
      <div className="info-card range-card">
        <h3>All Time Range</h3>
        <div className="range-slider">
          <div className="range-values">
            <span>${(stock.current_price - 10).toFixed(2)}</span>
            <span>${(stock.current_price + 10).toFixed(2)}</span>
          </div>
          <div className="range-bar">
            <div className="range-progress" style={{ width: '60%' }}></div>
            <div className="range-marker" style={{ left: '60%' }}></div>
          </div>
        </div>
      </div>

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
  )}

  {activeTab === 'fundamentals' && (
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

  {activeTab === 'dividends' && (
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

  {activeTab === 'about' && (
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
</div>


     
          
        
        </>
      )}
    </div> 
  );
};

export default StocksDetail;
