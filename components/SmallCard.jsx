"use client";
const SmallCard = ({ title, content, loading }) => {
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {loading ? (
          <p className="text-lg font-medium">Loading data...</p>
        ) : (
          <p className="text-lg font-medium">{content}</p>
        )}
      </div>
    </div>
  );
};

export default SmallCard;
