import React, { useEffect, useState } from "react";
import StockCard from "../components/StockCard.jsx";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
// import { stockService, portfolioService } from "../services/apis";



// const Stocks = () => {
//     const [stocks, setStocks] = useState(null);
//     const [cash, setCash] = useState(0);

//     useEffect(() => {
//         setTimeout(() => {
//             stockService
//                 .getStocks()
//                 .then((res) => setStocks(res))
//                 .catch((err) => console.log(""));
//             portfolioService
//                 .getCash()
//                 .then((res) => setCash(res.cash))
//                 .catch((err) => console.log(""));
//         }, 900);
//     }, []);


// Mock Data for stockService and portfolioService
export const stockService = {
    getStocks: () =>
        Promise.resolve([
            { id: 1, name: "Apple", symbol: "AAPL", price: 178.45, price_change: 2.3 },
            { id: 2, name: "Microsoft", symbol: "MSFT", price: 365.12, price_change: -1.2 },
            { id: 3, name: "Tesla", symbol: "TSLA", price: 215.67, price_change: 3.8 },
            { id: 4, name: "Amazon", symbol: "AMZN", price: 132.78, price_change: 0.5 },
            { id: 5, name: "Google", symbol: "GOOGL", price: 145.23, price_change: -0.9 }
        ]),
};

export const portfolioService = {
    getCash: () => Promise.resolve({ cash: 5000.75 }),
};

const Stocks = () => {
    const [stocks, setStocks] = useState(null);
    const [cash, setCash] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            stockService
                .getStocks()
                .then((res) => setStocks(res))
                .catch((err) => console.log("Error fetching stocks"));

            portfolioService
                .getCash()
                .then((res) => setCash(res.cash))
                .catch((err) => console.log("Error fetching cash"));
        }, 900);
    }, []);

    return (
        <div className="container p-1 p-sm-5">
            {/* Searchbar */}
            <div className="mt-1 mb-4">
                <div className="d-flex flex-row justify-content-between">
                    <div className="form-outline mobilesearchbar">
                        <input
                            type="search"
                            id="form1"
                            className="searchbar ms-0 ms-sm-3 form-control shadow-lg py-2"
                            placeholder="Search stocks by symbol"
                            aria-label="Search"
                            autoComplete="off"
                        />
                    </div>
                    <div className="btnbalance px-3 me-3 text-center p-2 shadow bi bi-wallet d-none d-sm-block">
                        {`₹ ${cash}`}
                    </div>
                </div>
            </div>

            {!stocks && (
                <ThreeDots
                    height="55"
                    width="55"
                    color="#5eb5f8"
                    ariaLabel="line-wave"
                    wrapperClass="loader"
                    visible={true}
                />
            )}

            {/* Columns */}
            <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 g-2 mt-5">
                {stocks && (
                    <>
                        {stocks.map((stock) => {
                            const change = parseFloat(stock.price_change).toFixed(2);
                            const color = change >= 0 ? "text-success" : "text-danger";
                            return (
                                <Link to={`/stocksdetail/${stock.id}`} key={stock.id}>
                                    <div className="col">
                                        <StockCard
                                            {...stock}
                                            change={change}
                                            color={color}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </>
                )}
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default Stocks;
