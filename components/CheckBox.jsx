"use client";

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore/lite";
import DialogCard from "./DialogCard";

const CheckBox = ({ userId, check }) => {
  const handleChange = async (e) => {
    confirm("Are you sure?");
    const check = e.target.checked;

    const updateRef = doc(db, "form-submission", userId);

    try {
      document.getElementById("eligible_modal").showModal();

      await updateDoc(updateRef, {
        eligible: check,
      });
    } catch (error) {
      console.error(error);
    } finally {
      document.getElementById("eligible_modal").close();
    }
  };

  return (
    <>
      <input
        type="checkbox"
        defaultChecked={check}
        onChange={handleChange}
        className="checkbox"
      />
      <DialogCard />
    </>
  );
};

export default CheckBox;
