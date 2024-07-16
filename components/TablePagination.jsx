import React, { useState } from "react";

const TablePagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="join justify-end">
        <button className="join-item btn" onClick={handlePrevPage}>
          «
        </button>
        <button className="join-item btn">{currentPage} of {totalPages}</button>
        <button className="join-item btn" onClick={handleNextPage}>
          »
        </button>
      </div>
    </>
  );
};

export default TablePagination;
