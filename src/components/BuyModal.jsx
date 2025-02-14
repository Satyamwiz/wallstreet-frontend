import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet, X } from "lucide-react";
import { stockService } from "../services/apis";
import { toast } from "react-toastify";
import socketService from "../services/socket.js";
import "./BuyModal.css";

const BuyModal = ({ id, name, cash, current_price, price_change, onClose }) => {
  const [qty, setQty] = useState(0);
  const [bidPrice, setBidPrice] = useState(current_price);
  const sign = price_change > 0 ? "+" : "";
  const color = price_change >= 0 ? "text-success" : "text-danger";
  const totalValue = bidPrice * qty;

  useEffect(() => {
    // Connect and subscribe to market updates for the given company name
    socketService.connect();
    console.log(name);
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

  // Define handleBuy outside the useEffect so it is available in the JSX
  const handleBuy = (e) => {
    e.preventDefault();
    const tid = toast.loading("Please wait...");
    const buyOrderData = { price: bidPrice, quantity: qty };

    stockService
      .buyStock(id, buyOrderData)
      .then((res) => {
        toast.update(tid, {
          render: "Buy order placed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2300,
        });
        onClose();
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
      <div
        className="buy-modal"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="modal-header">
          <h3 className="modal-title">{name}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="price-info">
            <div className="price-box">
              <p className="price-label">Current Price</p>
              <p className="price-value">{`₹ ${current_price}`}</p>
            </div>
            <div className="price-box">
              <p className="price-label">% Change</p>
              <p className={color}>{`${sign}${price_change}%`}</p>
            </div>
          </div>
          <div className="order-form">
            <div className="form-group">
              <label>Bid Price</label>
              <input
                type="number"
                className="stockquantity"
                value={bidPrice}
                onChange={(e) => setBidPrice(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="stockquantity"
                min="1"
                step="1"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>
        </div>
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
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleBuy}
            disabled={totalValue > cash || qty <= 0}
          >
            {totalValue > cash ? "Insufficient Funds" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
