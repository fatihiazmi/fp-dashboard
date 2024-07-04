"use client";
import Image from "next/image";
import CheckBox from "./CheckBox";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import DateFilter from "./DateFilter";
import { useDateFilter } from "@/context/DateFilterContext";

const PlayersDetailsTable = ({ userData, loading }) => {
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

  return (
    <>
      <DateFilter />
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-3xl text-center font-medium">Loading data...</p>
        ) : (
          <table className="table table-zebra table-fixed text-left">
            {/* head */}
            <thead>
              <tr>
                <th>Edit Details</th>
                <th>Date Posted</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th className="pl-7">Receipt</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {sortedUserData &&
                sortedUserData.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <Link href={`online/users/${user.id}`}>
                          <FaPencilAlt />
                        </Link>
                      </td>
                      <td>{formatDate(user.timestamp)}</td>
                      <td>{user.name}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>
                        <Image
                          src={user.receipt}
                          loading="lazy"
                          quality={80}
                          alt={user.receipt}
                          width={200}
                          height={200}
                        />
                      </td>
                      <td>
                        <CheckBox userId={user.id} check={user.eligible} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      {userData.length < 10 ? null : (
        <div className="join justify-end">
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
      )}
    </>
  );
};

export default PlayersDetailsTable;
