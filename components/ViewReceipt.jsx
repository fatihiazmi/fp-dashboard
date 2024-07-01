"use client";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";

const ViewReceipt = ({ receipt }) => {
  const [imgUrl, setImgUrl] = useState("");
  const handleClick = () => {
    document.getElementById("viewReceipt").showModal();
    const storage = getStorage();
    const imageRef = ref(storage, receipt);
    console.log(receipt);
    getDownloadURL(imageRef).then((url) => {
      setImgUrl(url)
    });
  };

  return (
    <>
      <button className="btn btn-ghost" onClick={handleClick}>
        View
      </button>
      <dialog id="viewReceipt" className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-lg">Receipt</h3>
          {/* <p className="py-4">Press ESC key or click outside to close</p> */}
          <Image src={imgUrl} alt={receipt} width={40} height={40} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ViewReceipt;
