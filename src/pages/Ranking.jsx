// src/pages/Leaderboard.js
import React, { useState, useEffect } from "react";
import RankCard from "../components/RankCard.jsx";
import { ThreeDots } from "react-loader-spinner";
import { rankService } from "../services/apis.js";
import { toast } from "react-toastify";
import "./Ranking.css";
import socketService from "../services/socket.js";


const Ranking = () => {
  const [ranks, setRanks] = useState(null);

  useEffect(() => {
    // Fetch rankings when the component mounts
    // rankService.getRankings()
    //   .then((response) => {
    //     // Optionally, sort the rankings by total value in descending order
    //     const sortedRanks = response.sort((a, b) => b.totalValue - a.totalValue);
    //     setRanks(sortedRanks);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     toast.error("Failed to fetch rankings.");
    //   });

    const printing=(data)=>{

      const sortedRanks = data.sort((a, b) => b.totalValue - a.totalValue);
      setRanks(sortedRanks);
    }
      socketService.ranking(printing);
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      {!ranks ? (
        <div className="loader">
          <ThreeDots
            height="55"
            width="55"
            color="#5eb5f8"
            ariaLabel="loading-indicator"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="leaderboard-header">
            <div className="header-cell rank-header">Rank</div>
            <div className="header-cell name-header">Name</div>
            <div className="header-cell cash-header">Cash</div>
            <div className="header-cell total-header">Networth</div>
          </div>
          <div className="leaderboard-list">
            {ranks.map((rank, index) => (
              <RankCard key={index} ranki={index + 1} {...rank} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Ranking;
