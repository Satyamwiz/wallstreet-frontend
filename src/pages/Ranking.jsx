import React, { useEffect, useState } from "react";
import axios from "axios";
import RankCard from "../components/RankCard"
import { ThreeDots } from "react-loader-spinner";
import { rankService } from "../services/apis";

const Ranking = () => {
  const [ranks, setRanks] = useState(null);

  useEffect(() => {

    setTimeout(() => {
      rankService.getRankings()
      .then((response) => {
        setRanks(response.slice(0,10));
      })
      .catch((error) => {
        console.log(error);
      });
    }, 1300)

    
  }, []);

  return (
    <div className="container p-0 p-sm-5">
      <div className="h3 ranking mb-3 mb-sm-4 text-center">Ranking</div>
      <br />

      {/* <div class="comingsoon">
                <h3 className='comingsoonText'>Will be updated soon...</h3>
            </div> */}

      {!ranks && (
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
      <div className="row row-cols-1 g-4 g-sm-3">
        {ranks && (
          <>
            {ranks.map((rank, index) => {
              return <RankCard key={rank.user_id} {...rank} ranki={index+1}/>;
            })}
          </>
        )}
      </div>
      <br />
      <br />


    </div>
  );
};

export default Ranking;
