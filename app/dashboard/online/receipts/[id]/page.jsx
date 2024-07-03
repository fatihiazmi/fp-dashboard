import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const ShowReceipt = () => {
  return (
    <>
      <Link href="/dashboard/online">
        <button className="btn flex items-center">
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
      </Link>
      <div>ShowReceipt</div>
    </>
  );
};

export default ShowReceipt;
