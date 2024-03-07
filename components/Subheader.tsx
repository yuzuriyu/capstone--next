"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";

const Subheader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDown = () => {
    setIsDropDownOpen((prevStatus) => !prevStatus);
  };
  return (
    <div className="relative bg-white">
      <div className="w-11/12 m-auto flex justify-end items-center py-4 md:w-10/12">
        <div className="flex items-center">
          {/* <img src={bell} alt="" className="mr-4" /> */}
          <div className="flex items-center" onClick={handleDropDown}>
            <Image
              src="/images/profile.jpg"
              width={40}
              height={40}
              alt=""
              className="rounded-full md:mr-2"
            />
            <p className="hidden md:block font-bold">Cole</p>
          </div>
        </div>
      </div>
      {/* {isDropDownOpen && <DropDown />} */}
    </div>
  );
};

export default Subheader;
