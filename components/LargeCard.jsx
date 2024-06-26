import React from "react";

const LargeCard = ({ children, title }) => {
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        { children }
      </div>
    </div>
  );
};

export default LargeCard;
