import React from "react";

const RankCard = ({id, name, networth, ranki}) => {
  return (
    <div className="container">
      <div
        className="card mx-ms-auto mx-3 shadow"
        style={{ backgroundColor: "#3d3d4c", color: "#fefdff" }}
      >
        <div className="card-body" style={{ padding: "12px" }}>
          <div className="row row-cols-3 text-center">
            <div className="">{ranki}</div>
            <div>{name}</div>
            <div>{`₹ ${networth}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankCard;
