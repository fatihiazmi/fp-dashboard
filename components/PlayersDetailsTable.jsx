"use client";
import { useRef } from "react";
import Image from "next/image";
import CheckBox from "./CheckBox";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import DateFilter from "./DateFilter";
import { useDateFilter } from "@/context/DateFilterContext";
import { useState } from "react";
import TablePagination from "./TablePagination";
import ExportButton from "./ExportButton";

const PlayersDetailsTable = ({ userData, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [receipt, setReceipt] = useState(null);
  const tableRef = useRef(null);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB").format(date);
  };

  const { dateFilter } = useDateFilter();

  const filteredUserData = userData.filter((user) => {
    const userDate = formatDate(user.timestamp);
    const startDate = dateFilter.startDate
      ? formatDate(dateFilter.startDate)
      : null;
    const endDate = dateFilter.endDate ? formatDate(dateFilter.endDate) : null;
    if (startDate && endDate) {
      return userDate >= startDate && userDate <= endDate;
    } else if (startDate) {
      return userDate >= startDate;
    } else if (endDate) {
      return userDate <= endDate;
    }
    return true; // Return true if no filter applied
  });

  const sortedUserData = [...filteredUserData].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const currentItems = sortedUserData.slice(firstItemIndex, lastItemIndex);

  const handleImageClick = ({ receipt }) => {
    setReceipt(receipt);
    document.getElementById("receiptModal").showModal();
  };

  const handleImageClose = () => {
    setReceipt(null);
  };


  return (
    <>
      <DateFilter />
      <ExportButton tableRef={tableRef} />
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-3xl text-center font-medium">Loading data...</p>
        ) : (
          <>
            <table
              ref={tableRef}
              className="table table-zebra table-auto text-left"
            >
              {/* head */}
              <thead>
                <tr>
                  <th>Edit Details</th>
                  <th>Date Posted</th>
                  <th>Name</th>
                  <th style={{ textAlign: "center" }}>Score</th>
                  <th style={{ textAlign: "center" }}>Time</th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  {/* <th className="pl-7">Receipt</th> */}
                  <th>Eligibility</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <Link href={`online/users/${user.id}`}>
                            <FaPencilAlt />
                          </Link>
                        </td>
                        <td>{formatDate(user.timestamp)}</td>
                        <td>{user.name}</td>
                        <td style={{ textAlign: "center" }}>
                          {user.score ? user.score : "-"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {user.time ? user.time : "-"}
                        </td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        {/* <td>
                          <Image
                            style={{ cursor: "pointer" }}
                            src={user.receipt}
                            loading="lazy"
                            quality={80}
                            alt={user.receipt}
                            width={150}
                            height={150}
                            onClick={() => handleImageClick(user)}
                          />
                        </td> */}
                        <td>
                          <CheckBox userId={user.id} check={user.eligible} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        )}
      </div>
      <TablePagination
        totalItems={sortedUserData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <dialog id="receiptModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Receipt</h3>
          {receipt && (
            <Image
              src={receipt}
              loading="lazy"
              quality={80}
              alt={receipt}
              width={700}
              height={700}
            />
          )}
        </div>
        <form
          onClick={handleImageClose}
          method="dialog"
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default PlayersDetailsTable;
