import React from "react";
import Image from "next/image";

const Documentation = () => {
  return (
    <>
      <div className="relative h-[316px] w-full">
        <Image
          src="/images/sunny.jpg"
          alt=""
          className="object-cover h-full w-full"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-playfair text-white">Gallery</h1>
        </div>
      </div>
      <div className="w-11/12 m-auto py-20 md:w-10/12 h-[450px]"></div>
    </>
  );
};

export default Documentation;
