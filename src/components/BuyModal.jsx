import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet, X, AlertTriangle } from "lucide-react";
import { stockService,portfolioService } from "../services/apis";
import { toast } from "react-toastify";
import socketService from "../services/socket.js";
import "./BuyModal.css";

const BuyModal = ({ id, name, price, onClose }) => {
  console.log("ID:", id);
  console.log("Name:", name);
 
  console.log("Price:", price);

  const [qty, setQty] = useState(0);
  const [bidPrice, setBidPrice] = useState(price);
  const [buyprice, setbuyprice] = useState(0);
  const [showCircuitWarning, setShowCircuitWarning] = useState(false);
  const [cash, setCash] = useState(0);
  // Calculate dynamic 24h price change using market bidPrice vs. initial price prop
  const dynamicPriceChange = ((bidPrice - price) / price) * 100;
  const isPositive = dynamicPriceChange >= 0;
  const totalValue = buyprice * qty;
  useEffect(() => {
    portfolioService
    .getCash()
    .then((paisa) => {
      
      setCash(paisa.cash)
    })
    .catch((err) => toast.error("Error fetching cash", err));
  }, []);
  useEffect(() => {
    // Connect and subscribe to market updates for the given company name
    socketService.connect();
    socketService.subscribeToCompany(name);

    const handleMarketUpdate = (data) => {
      // Update bidPrice when new market data arrives
      setBidPrice(Number(data.price));
    };

    socketService.onMarketUpdate(handleMarketUpdate);

    // Cleanup function to remove listeners and disconnect
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [name]);

  // Check for circuit limit violation when buyprice or dynamic bidPrice changes
  useEffect(() => {
    if (bidPrice === 0 || buyprice === 0) return;
    
    const priceDifference = Math.abs(buyprice - bidPrice);
    const percentageDifference = (priceDifference / bidPrice) * 100;
    
    if (percentageDifference >= 40) {
      setShowCircuitWarning(true);
    } else {
      setShowCircuitWarning(false);
    }
  }, [bidPrice, buyprice]);

  const handleBuy = (e) => {
    e.preventDefault();
   
    const tid = toast.loading("Please wait...");
    const buyOrderData = { price: buyprice, quantity: qty, companyName: name };

    stockService
      .buyStock(id, buyOrderData)
      .then(() => {
        toast.update(tid, {
          render: "Buy order placed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2300,

        });
        onClose();
        setTimeout(() => {
          window.location.href = "/portfolio";
        }, 8000);
      })
      .catch((err) => {
        toast.update(tid, {
          render: err.data.detail,
          type: "error",
          isLoading: false,
          autoClose: 2300,
        });
      });
  };

  return (
    <div className="buy-modal-overlay" onClick={onClose}>
      <div className="buy-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">Buy {name}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="price-info">
            <div className="price-box">
              <p className="price-label">Current Price</p>
              <p className="price-value">{`₹ ${Number(bidPrice).toFixed(2)}`}</p>
            </div>
            <div className="price-box">
              <p className="price-label">24h Change</p>
              <p className={`price-change ${isPositive ? "positive" : "negative"}`}>
                {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                {Math.abs(dynamicPriceChange).toFixed(2)}%
              </p>
            </div>
          </div>
          
          {/* Circuit Limit Warning */}
          {showCircuitWarning && (
            <div className="circuit-warning">
              <AlertTriangle size={20} className="warning-icon" />
              <p>Price has crossed the circuit limit according to credenz stock exchange</p>
            </div>
          )}
          
          <div className="order-form">
            <div className="form-group">
              <label>Bid Price (₹)</label>
              <input
                type="number"
                value={buyprice || ""}
                onChange={(e) => setbuyprice(Number(e.target.value))}
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={qty || ""}
                onChange={(e) => setQty(parseInt(e.target.value, 10) || 0)}
                min="1"
                step="1"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="modal-summary">
          <div className="summary-row">
            <div className="summary-label">
              <Wallet size={20} /> Cash
            </div>
            <div className="summary-value">{`₹ ${Number(cash).toFixed(2)}`}</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Total Value</div>
            <div className="summary-value">{`₹ ${Number(totalValue).toFixed(2)}`}</div>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="modal-footer">
          <button
            type="button"
            className="action-button"
            onClick={handleBuy}
            disabled={totalValue > cash || qty <= 0 || showCircuitWarning}
          >
            {totalValue > cash 
              ? "Insufficient Funds" 
              : showCircuitWarning 
                ? "Circuit Limit Exceeded" 
                : "Place Buy Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
