"use client";

import { useState } from "react";
import DialogCard from "./DialogCard";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "@/firebase";

const EditUserForm = ({ userId, userData }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);

  const handleSubmit = async (event) => {
    event.preventDefault();
    confirm("Are you sure you want to edit this?");

    const updateRef = doc(db, "form-submission", userId);

    try {
      document.getElementById("eligible_modal").showModal();
      await updateDoc(updateRef, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      console.error(error);
    } finally {
      document.getElementById("eligible_modal").close();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card bg-base-300 shadow-xl p-16 pt-6 max-w-[60rem] m-auto">
          <div className="card-body">
            <h2 className="card-title m-auto pb-10">Edit User Details</h2>
            <div className="flex flex-col gap-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  defaultValue={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  defaultValue={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  defaultValue={phoneNumber}
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <button className="btn btn-primary w-full">Submit</button>
            </div>
          </div>
        </div>
      </form>
      <DialogCard />
    </>
  );
};

export default EditUserForm;
