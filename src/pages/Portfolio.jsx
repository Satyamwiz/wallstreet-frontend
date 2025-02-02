import { React, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
// import { portfolioService } from "../services/apis";

// const Portfolio = () => {
//     const [cash, setCash] = useState(0);
//     const [networth, setNetworth] = useState(0);
//     const [transactions, setTransactions] = useState([]);
//     const [holdings, setHoldings] = useState(null);

//     useEffect(() => {
//         setTimeout(() => {
//             portfolioService
//                 .getPortfolio()
//                 .then((res) => {
//                     setCash(res.cash);
//                     setHoldings(res.holdings);
//                     setNetworth(res.networth);
//                 })
//                 .catch((err) => console.log(""));
//             portfolioService
//                 .getTransactions()
//                 .then((res) => {
//                     setTransactions(res);
//                     // console.log(res)
//                 })
//                 .catch((err) => console.log(""));
//         }, 900);
//     }, []);
const Portfolio = () => {
    const [cash, setCash] = useState(0);
    const [networth, setNetworth] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [holdings, setHoldings] = useState(null);
    const [pendingTransactions, setPendingTransactions] = useState([]);

    // Mock data structure
    const mockPortfolio = {
        cash: 25000.50,
        networth: 154300.75,
        holdings: [
            {
                stock__ticker: "AAPL",
                total_quantity: 50,
                avg_price: 145.30,
                stock__current_price: 185.45,
                profit_loss: 2007.50,
                trade_type: "delivery"
            },
            {
                stock__ticker: "TSLA",
                total_quantity: 25,
                avg_price: 220.50,
                stock__current_price: 275.80,
                profit_loss: 1382.50,
                trade_type: "intraday"
            },
            {
                stock__ticker: "MSFT",
                total_quantity: 40,
                avg_price: 245.75,
                stock__current_price: 310.20,
                profit_loss: 2578.00,
                trade_type: "delivery"
            }
        ]
    };

    const mockTransactions = [
        { id: 1, ticker: "AAPL", quantity: 10, transaction_type: "buy", traded_price: 182.50, date: "2024-02-01", trade_type: "delivery" },
        { id: 2, ticker: "TSLA", quantity: 5, transaction_type: "sell", traded_price: 270.25, date: "2024-02-01", trade_type: "intraday" },
        { id: 3, ticker: "GOOGL", quantity: 8, transaction_type: "buy", traded_price: 2350.75, date: "2024-02-01", trade_type: "delivery" }
    ];

    const mockPendingTransactions = [
        { id: 1, ticker: "MSFT", quantity: 15, transaction_type: "buy", traded_price: 305.00, date: "2024-02-02", trade_type: "delivery" },
        { id: 2, ticker: "NVDA", quantity: 5, transaction_type: "sell", traded_price: 580.25, date: "2024-02-02", trade_type: "intraday" }
    ];

    useEffect(() => {
        setTimeout(() => {
            setCash(mockPortfolio.cash);
            setHoldings(mockPortfolio.holdings);
            setNetworth(mockPortfolio.networth);
            setTransactions(mockTransactions);
            setPendingTransactions(mockPendingTransactions);
        }, 900);
    }, []);

    const handleCancelTransaction = (transactionId) => {
        setPendingTransactions(prevTransactions => 
            prevTransactions.filter(t => t.id !== transactionId)
        );
    };

    return (
        <div>
            {/* Title */}
            <div className="h3 ipoupcoming mb-5 mb-sm-5 text-center mt-sm-5 mt-5 py-1">
                Portfolio
            </div>
            {!holdings && (
                <ThreeDots
                    height="55"
                    width="55"
                    color="#5eb5f8"
                    ariaLabel="line-wave"
                    wrapperClass="loader"
                    visible={true}
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                />
            )}
            {holdings && (
                <>
                    {/* Portfolio card */}
                    <div class=" container card p-1 shadow portfolioCard text-light mt-4 p-2">
                        <div class="card-body stockcard-body w-100">
                            <div class="row">
                                <div class="col-6">
                                    <p class="mt-2 mb-sm-2 h5 ms-sm-3 bi bi-pie-chart d-none d-sm-block">
                                        {" "}
                                        Net Worth : {`₹ ${networth}`}
                                    </p>
                                    <p class="mb-3 mb-sm-2 h5 ms-sm-3 bi bi-pie-chart d-block d-sm-none ">
                                        {" "}
                                        Net Worth :{" "}
                                    </p>
                                    <p class="mb-0 h5 ms-sm-4 mt-3 d-block d-sm-none">{`₹ ${networth}`}</p>
                                </div>
                                <div class="col-6 text-end">
                                    <p class="mt-2 mb-sm-2 h5 ms-sm-3 me-2 bi bi-wallet d-none d-sm-block">
                                        {" "}
                                        Cash : {`₹ ${cash}`}
                                    </p>
                                    <p class="mb-3 mb-sm-2 h5 ms-sm-3 bi bi-wallet d-block d-sm-none ">
                                        {" "}
                                        Cash :{" "}
                                    </p>
                                    <p class="mb-0 h5 ms-sm-4 mt-3 d-block d-sm-none">{`₹ ${cash}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h5 text-light mb-5 mb-sm-5 text-center mt-sm-5 mt-5">
                        Current Holdings
                    </div>

                    {/* Table */}
                    <div className="container portfolioTable mt-5 shadow border-0 p-1">
                        <table class="table text-light text-center table-fixed">
                            <thead>
                                <tr style={{ color: "#5eb5f8" }}>
                                    <th scope="col" className="py-3">
                                        Company
                                    </th>
                                    <th scope="col" className="py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="py-3">
                                        Avg Buy Price
                                    </th>
                                    <th scope="col" className="py-3">
                                        Current Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {holdings.map((holding) => {
                                        return (
                                            <tr className="border-0">
                                                <td scope="row">
                                                    {holding.stock__ticker}
                                                </td>
                                                <td>
                                                    {holding.total_quantity}
                                                </td>
                                                <td>
                                                    ₹{" "}
                                                    {`${parseFloat(
                                                        holding.avg_price
                                                    ).toFixed(2)}`}
                                                </td>
                                                <td>
                                                    ₹{" "}
                                                    {`${parseFloat(
                                                        holding.stock__current_price
                                                    ).toFixed(2)}`}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>

                    {/* Transaction history */}
                    <div className="h5 text-light mb-5 mb-sm-5 text-center mt-sm-5 mt-5">
                        Recent Transactions
                    </div>

                    {/* Transaction table */}
                    <div className="container portfolioTable mt-5 shadow border-0 p-1 mb-5">
                        <table class="table text-light text-center table-fixed">
                            <thead>
                                <tr style={{ color: "#5eb5f8" }}>
                                    <th scope="col" className="py-3">
                                        Company
                                    </th>
                                    <th scope="col" className="py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {transactions.map((t) => {
                                        let color = t.transaction_type === "buy" ? "text-success" : "text-danger";
                                        color = t.transaction_type === "pend" ? "text-muted" : color;
                                        let transaction_type = t.transaction_type === "pend" ? "failed".toUpperCase() : t.transaction_type.toUpperCase()
                                        return (
                                            <tr className="border-0">
                                                <td scope="row">{t.ticker}</td>
                                                <td>{t.quantity}</td>
                                                <td
                                                    className={`${color} fw-bold`}
                                                >
                                                    {transaction_type.toUpperCase()}
                                                </td>
                                                <td>₹ {t.traded_price}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <br />
            <br />
        </div>
    );
};

export default Portfolio;
