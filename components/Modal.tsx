import React from "react";
import Image from "next/image";

const Modal = (props: any) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="max-w-screen-lg w-full bg-white ">
        <Image
          src={props.selectedImage}
          alt=""
          className="w-full h-full"
          width={0}
          height={0}
          sizes="100vw"
        />
        <button
          onClick={props.closeModal}
          className="absolute top-0 right-0 m-4 bg-customblue text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
