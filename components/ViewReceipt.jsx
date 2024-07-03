"use client";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";

const ViewReceipt = ({ receipt }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [currentReceipt, setCurrentReceipt] = useState(receipt);
  // const [showReceipt, setShowReceipt] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      // setShowReceipt(true);
      document.getElementById("viewReceipt").showModal();
      if (!receipt) {
        setError("No receipt provided");
        return;
      }
      setCurrentReceipt(receipt);
      const storage = getStorage();
      const imageRef = ref(storage, currentReceipt);

      const imageURL = await getDownloadURL(imageRef);

      if (imageURL) {
        setImgUrl(imageURL);
        setError(null);
      } else {
        setError("Invalid image URL");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load image");
    }
  };

  const handleClose = () => {
    // setShowReceipt(false);
    setImgUrl("");
    setError(null);
  };

  return (
    <>
      <button className="btn btn-ghost" onClick={handleClick}>
        View
      </button>
        <dialog id="viewReceipt" className="modal">
          <div className="modal-box flex flex-col items-center">
            <h3 className="font-bold text-lg">Receipt</h3>
            {error ? (
              <p className="py-4 text-red-500">{error}</p>
            ) : imgUrl ? (
              <Image src={imgUrl} alt={receipt} width={400} height={400} />
            ) : (
              <>
                <p>Loading...</p>
              </>
            )}
          </div>
          <form
            method="dialog"
            onClick={handleClose}
            className="modal-backdrop"
          >
            <button>close</button>
          </form>
        </dialog>
    </>
  );
};

export default ViewReceipt;
