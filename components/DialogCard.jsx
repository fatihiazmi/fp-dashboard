import React from "react";
import { ImSpinner10 } from "react-icons/im";

const DialogCard = () => {
  return (
    <>
      <dialog id="eligible_modal" className="modal">
        <div className="modal-box flex flex-col justify-center items-center">
          <h3 className="font-bold text-lg">Please wait...</h3>
          <p className="py-4">
            <ImSpinner10 size={70} className="spinner" />
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default DialogCard;
