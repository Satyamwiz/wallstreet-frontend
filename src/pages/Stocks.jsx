import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import "./Stocks.css";

const stockService = {
    getStocks: () =>
        Promise.resolve([
            { id: 1, name: "AMC Entertainment Holdings", symbol: "AMC", price: 7.34, price_change: -18.90, exchange: "TSE" },
            { id: 2, name: "Adobe", symbol: "ADBE", price: 434.68, price_change: -0.26, exchange: "NASDAQ" },
            { id: 3, name: "Advanced Micro Devices", symbol: "AMD", price: 102.16, price_change: -0.53, exchange: "NASDAQ" },
            { id: 4, name: "Alliance Data Systems Corp", symbol: "ADS", price: 1119.87, price_change: 0.00, exchange: "TSE" },
            { id: 5, name: "Amazon.com", symbol: "AMZN", price: 236.35, price_change: -0.04, exchange: "NASDAQ" }
        ]),
};

const Stocks = () => {
    const [stocks, setStocks] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark" || false
    );

    useEffect(() => {
        setTimeout(() => {
            stockService
                .getStocks()
                .then((res) => setStocks(res))
                .catch(() => console.log("Error fetching stocks"));
        }, 900);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className={`stocks-container ${darkMode ? "dark-mode" : "light-mode"}`}>
            <label className="theme-toggle">
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                <span className="slider"></span>
            </label>
            
            <h2 className="stocks-heading">Browse the market.</h2>
            <p className="stocks-subheading">Explore our selection of the biggest names in the industry.</p>

            <input
                type="text"
                className="search-bar"
                placeholder="Search by ticker, company, description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {!stocks && (
                <div className="loader">
                    <ThreeDots height="55" width="55" color="#5eb5f8" />
                </div>
            )}

            <div className="stock-grid">
                {stocks &&
                    stocks
                        .filter((stock) =>
                            stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((stock) => {
                            const change = stock.price_change.toFixed(2);
                            const isPositive = stock.price_change >= 0;
                            return (
                                <Link to={`/stocksdetail/${stock.id}`} key={stock.id} className="stock-card">
                                    <div className="stock-logo">{stock.symbol}</div>
                                    <div className="stock-info">
                                        <h3>{stock.name}</h3>
                                        <p className="stock-exchange">{stock.exchange} : {stock.symbol}</p>
                                        <span className={`stock-price ${isPositive ? "green" : "red"}`}>
                                            ${stock.price} {isPositive ? `+${change}%` : `${change}%`}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
            </div>
        </div>
    );
};

export default Stocks;
