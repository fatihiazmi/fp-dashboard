import { FaCircleCheck } from "react-icons/fa6";

const SuccessCard = ({ message }) => {
  return (
    <>
      <dialog id="success_modal" className="modal">
        <div className="modal-box flex flex-col justify-center items-center">
          <h3 className="font-bold text-lg flex items-center">
            <span className="mr-2">
              <FaCircleCheck size={30} color="#00FF00" />
            </span>
            Success!
          </h3>
          <p className="py-4 text-green-600 font-bold">{message}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default SuccessCard;
