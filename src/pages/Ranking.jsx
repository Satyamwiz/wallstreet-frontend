import React, { useEffect, useState } from "react";
import axios from "axios";
import RankCard from "../components/RankCard"
import { ThreeDots } from "react-loader-spinner";
// import { rankService } from "../services/apis";
export const rankService = {
  getRankings: () =>
    Promise.resolve([
      {
        user_id: "1",
        name: "John Doe",
        networth: 1250000,
        change: 12.5,
        portfolio: {
          stocks: 15,
          profit: 45000
        }
      },
      {
        user_id: "2",
        name: "Jane Smith",
        networth: 980000,
        change: -2.3,
        portfolio: {
          stocks: 12,
          profit: -12000
        }
      },
      {
        user_id: "3",
        name: "Robert Johnson",
        networth: 875000,
        change: 5.7,
        portfolio: {
          stocks: 8,
          profit: 25000
        }
      },
      {
        user_id: "4",
        name: "Emily Brown",
        networth: 750000,
        change: 8.9,
        portfolio: {
          stocks: 10,
          profit: 35000
        }
      },
      {
        user_id: "5",
        name: "Michael Wilson",
        networth: 625000,
        change: -1.5,
        portfolio: {
          stocks: 6,
          profit: -5000
        }
      }
    ])
};
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
