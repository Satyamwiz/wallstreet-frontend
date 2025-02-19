import  { useEffect, useState } from "react";
import { portfolioService } from "../services/apis.js";
import "./TransactionHistory.css"; 

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await portfolioService.getTransactions();
        console.log("API Response:", response);

        let data = [];
        if (response && response.data) {
          data = response.data;
        } else if (Array.isArray(response)) {
          // If the response itself is an array, use it directly
          data = response;
        } else {
          console.error("Unexpected response format:", response);
        }

        // Ensure data is an array; if not, log an error and default to an empty array
        if (!Array.isArray(data)) {
          console.error("Expected an array but received:", data);
          data = [];
        }
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-history container mt-5">
      <h3 className="text-light mb-4 text-center">Transaction History</h3>
      
      {/* A container with a set max-height and scroll */}
      <div className="transaction-table-container">
        <table className="table text-light text-center">
          <thead>
            <tr style={{ color: "#5eb5f8" }}>
              
              <th scope="col">Company</th>
              <th scope="col">Quantity</th>
              <th scope="col">Order Type</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.order_id}>
                <td className="company-name">{transaction.companyName}</td>
                <td>{transaction.quantity}</td>
                <td
                  className={
                    transaction.order_type === "BUY"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {transaction.order_type.toUpperCase()}
                </td>
                <td>{Number(transaction.price).toFixed(2)}</td>
                <td
                  className={
                    String(transaction.status) === "COMPLETED"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {transaction.status}
                </td>
                <td>{new Date(transaction.datetimePlaced).toLocaleDateString()}</td>
                <td>{new Date(transaction.datetimePlaced).toLocaleTimeString()}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
