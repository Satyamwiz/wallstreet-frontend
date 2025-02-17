import React, { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  ReferenceLine
} from "recharts";
import { io } from "socket.io-client";
import axios from "axios";
import "./Graph.css"; 

const socket = io("https://bklay.xyz", {
  transports: ["websocket", "polling"],
  path: "/socket.io",
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

const Graph = ({ companyName }) => { // Accept companyName as a prop
  const [data, setData] = useState([]);
  const [openingPrice, setOpeningPrice] = useState(null);
  // windowSize controls how many data points are shown. Start zoomed in (fewer points)
  const [windowSize, setWindowSize] = useState(30);


  useEffect(() => {
    // Fetch historical data for the chart
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.post("https://bklay.xyz/market/historicalMarketData", {
          companyName,
        });
        const formattedData = response.data.map(d => ({
          time: new Date(d.time).toLocaleTimeString(),
          price: d.price,
        }));
        setData(formattedData);
        // Adjust the windowSize if there are fewer data points than our initial setting.
        if (formattedData.length < windowSize) {
          setWindowSize(formattedData.length);
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    // Fetch the market opening price
    const fetchOpeningPrice = async () => {
      try {
        const response = await axios.post("https://bklay.xyz/market/opening", { companyName });
        const price = Number(response.data.openingPrice);
        console.log("Opening price:", price);
        setOpeningPrice(price);
      } catch (error) {
        console.error("Error fetching opening price:", error);
      }
    };

    fetchHistoricalData();
    fetchOpeningPrice();

    // Setup WebSocket connection for real-time updates
    socket.on("connect", () => {
      console.log("Connected to the server");
      socket.emit("subscribeToCompany", companyName);
    });

    socket.on("market", (message) => {
      console.log(`Received market update for ${companyName}:`, message);
      setData(prevData => [
        ...prevData,
        { time: new Date(message.time).toLocaleTimeString(), price: message.price },
      ]);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from the server. Reason:", reason);
    });

    return () => {
      socket.off("market");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [companyName, windowSize]);

  // Determine the line color based on current price vs. opening price
  let lineColor = "#00c853"; // default green
  if (openingPrice !== null && data.length > 0) {
    const currentPrice = data[data.length - 1].price;
    lineColor = currentPrice >= openingPrice ? "#00c853" : "#ff0000";
  }

  // Determine the subset of data to display based on windowSize.
  const viewData = data.slice(Math.max(0, data.length - windowSize), data.length);

  // Button handlers to adjust windowSize.
  const handleZoomIn = () => {
    // Zooming in means reducing the window (but not less than a minimum, e.g. 10 points).
    if (windowSize > 10) {
      setWindowSize(windowSize - 10);
    }
  };

  const handleZoomOut = () => {
    // Zooming out means increasing the window (up to the total number of data points).
    if (windowSize < data.length) {
      setWindowSize(Math.min(data.length, windowSize + 10));
    }
  };

  return (
    <div style={{ width: "60vw", height: "60vh", padding: "20px", margin: "auto" }}>
      {/* <h2>{companyName} Market Data</h2> */}
      <div style={{ marginBottom: "10px" }}>
        <button className="boton-elegante" onClick={handleZoomIn} style={{ marginRight: "10px" }}>
          Zoom In
        </button>
        <button className="boton-elegante" onClick={handleZoomOut}>
          Zoom Out
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={viewData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ddd" minTickGap={20} tick={{ fontSize: 12 }} />
          <YAxis 
            domain={[
              (dataMin) => openingPrice ? Math.min(dataMin, openingPrice * 0.9) : dataMin,
              (dataMax) => openingPrice ? Math.max(dataMax, openingPrice * 1.1) : dataMax
            ]}
            stroke="#ddd"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#1e1e1e", color: "#fff" }}
            formatter={(value) => typeof value === "number" ? value.toFixed(1) : value}
          />
          <Line 
            type="linear"
            dataKey="price" 
            stroke={lineColor} 
            strokeWidth={2.5} 
            dot={false} 
            isAnimationActive={true}
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          {openingPrice !== null && (
            <ReferenceLine y={openingPrice} stroke="#fff" strokeDasharray="3 3" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
