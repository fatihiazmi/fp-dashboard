import { MdError } from "react-icons/md";

const ErrorCard = () => {
  return (
    <>
      <dialog id="error_modal" className="modal">
        <div className="modal-box flex flex-col justify-center items-center">
          <h3 className="font-bold text-lg flex items-center">
            <span className="mr-2">
              <MdError size={30} color="#FF0000" />
            </span>{" "}
            Error
          </h3>
          <p className="py-4 text-red-500 font-bold">Wrong Login Credetials</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ErrorCard;
