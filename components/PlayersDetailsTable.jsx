"use client";
import { useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import ViewReceipt from "./ViewReceipt";

const PlayersTable = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Network response not OK " + response.statusText);
        }
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Receipt</th>
              <th>Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.timestamp}</td>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>
                      <ViewReceipt receipt={user.receipt} />
                    </td>
                    <td>
                      <CheckBox userId={user.id} check={user.eligible} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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

export default PlayersTable;
