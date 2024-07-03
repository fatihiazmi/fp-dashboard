"use client";
import { useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import ViewReceipt from "./ViewReceipt";
import { FaPencilAlt } from "react-icons/fa";

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
        <table className="table table-zebra table-fixed text-left">
          {/* head */}
          <thead>
            <tr>
              <th>Edit Details</th>
              <th>Timestamp</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th className="pl-7">Receipt</th>
              <th>Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <button
                        className="btn btn-ghost"
                        onClick={() =>
                          document.getElementById("editDetails").showModal()
                        }
                      >
                        <FaPencilAlt />
                      </button>
                    </td>
                    <td>{user.timestamp}</td>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>
                      <ViewReceipt userId={user.id} />
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

      <dialog id="editDetails" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PlayersTable;
