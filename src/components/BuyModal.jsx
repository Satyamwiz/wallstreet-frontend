import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet, X } from "lucide-react";
// import { stockService } from "../services/apis";
import { toast } from "react-toastify";
import "./BuyModal.css";
// export const stockService = {
//     getStockDetail: (id) =>
//       Promise.resolve({
//         id: id,
//         ticker: "AAPL",
//         name: "Apple Inc.",
//         current_price: 178.45,
//         price_change: 2.3,
//         // Intraday price history (no longer used)
//         price_history: [
//           { datetime: "2025-02-01T00:00:00Z", price: 178.45 },
//           { datetime: "2025-02-02T00:00:00Z", price: 180.00 },
//           { datetime: "2025-02-03T00:00:00Z", price: 182.20 },
//           { datetime: "2025-02-04T00:00:00Z", price: 183.50 },
//           { datetime: "2025-02-05T00:00:00Z", price: 185.75 },
//         ],
//         // Delivery (long-term) price history used for the chart
//         delivery_price_history: [
//           { datetime: "2025-01-01T00:00:00Z", price: 170.45 },
//           { datetime: "2025-01-15T00:00:00Z", price: 172.00 },
//           { datetime: "2025-02-01T00:00:00Z", price: 175.20 },
//           { datetime: "2025-02-15T00:00:00Z", price: 178.50 },
//           { datetime: "2025-03-01T00:00:00Z", price: 180.75 },
//         ],
//         details:
//           "<p>Apple Inc. is a leading technology company known for its innovative products including the iPhone, Mac, and iPad.</p>",
//         dividendYield: 1.5,          // in percentage
//         dividendPerShare: 0.82,       // in dollars
//         exDividendDate: "2025-02-15",
//         paymentDate: "2025-03-01",
//         marketCap: "2.3T",           // trillion dollars representation
//         peRatio: 28.5,
//         sector: "Technology",
//         industry: "Consumer Electronics",
//       }),
//   };
const BuyModal = ({
  id,
  ticker,
  name,
  cash,
  current_price,
  price_change,
  onClose,
}) => {
  const [qty, setQty] = useState(0);
  const [bidPrice, setBidPrice] = useState(current_price);
  const sign = price_change > 0 ? "+" : "";
  const color = price_change >= 0 ? "text-success" : "text-danger";
  const totalValue = bidPrice * qty;

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
          <h3 className="modal-title">
            {ticker} - {name}
          </h3>
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
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="modal-summary">
          <div className="summary-row">
            <div className="summary-label">
              <Wallet size={20} /> Cash
            </div>
            <div className="summary-value">{`₹ ${cash.toFixed(2)}`}</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Total Value</div>
            <div className="summary-value">{`₹ ${totalValue.toFixed(2)}`}</div>
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
