import React from "react";
import Image from "next/image";

const PersonalInfo = () => {
  return (
    <div>
      <div className="relative h-[316px] w-full">
        <Image
          src={"/images/city.jpg"}
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute bottom-4 left-4 flex items-center">
          <Image
            src={"/images/profile.jpg"}
            alt=""
            height={100}
            width={100}
            className="rounded-lg p-1 bg-white mr-4"
          />
          <div>
            <p className="text-white font-bold text-xl">Carey Cole Garcia</p>
            <p className="text-white">CEO of Kaiba Corporation</p>
          </div>
        </div>
      </div>
      <div className="w-11/12 m-auto md:w-10/12 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="shadow-lg rouded-lg py-4 px-4">
            <p>Level</p>
            <p className="font-bold text-lg py-4">1</p>
          </div>
          <div className="shadow-lg rouded-lg py-4 px-4">
            <p>Total Voltage Generated</p>
            <p className="font-bold text-lg py-4">1</p>
          </div>
          <div className="shadow-lg rouded-lg py-4 px-4">
            <p>Total Steps Taken</p>
            <p className="font-bold text-lg py-4">1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
