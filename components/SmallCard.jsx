import { FaCaretUp, FaCaretDown } from "react-icons/fa"

const SmallCard = ({ title, content, trend }) => {
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title} { trend === "up" ? <FaCaretUp color="green" /> : <FaCaretDown color="red" /> }</h2>
        <p className="text-lg font-medium">{content}</p>
      </div>
    </div>
  );
};

export default SmallCard;
