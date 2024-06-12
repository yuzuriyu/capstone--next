import React from "react";

import Image from "next/image";

export default function About() {
  return (
    <div className="lg:my-20 my-4 py-4 px-4 w-11/12 lg:w-8/12 m-auto grid md:grid-cols-3 gap-4 grid-cols-1 h-[750px] bg-white rounded-lg">
      <div className="relative col-start-1 col-end-1 row-start-1 row-end-2">
        <Image
          src={"/images/sunny.jpg"}
          alt=""
          className="w-full h-full object-cover rounded-tl-lg"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute bottom-4 left-4">
          <p className="text-lg  text-white">Jhun Tibayan</p>
          <p className="text-white">Team Leader</p>
        </div>
      </div>
      <div className="relative ">
        <Image
          src={"/images/spring.jpg"}
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute bottom-4 left-4">
          <p className="text-lg  text-white">Carey Cole Garcia</p>
          <p className="text-white">Team Member</p>
        </div>
      </div>
      <div className="relative ">
        <Image
          src={"/images/winter.jpg"}
          alt=""
          className="w-full h-full object-cover rounded-tr-lg"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute bottom-4 left-4">
          <p className="text-lg  text-white">Cedrick Abitria Guiriba</p>
          <p className="text-white">Team Member</p>
        </div>
      </div>
      <div className="relative ">
        <Image
          src={"/images/autumn.jpg"}
          alt=""
          className="w-full h-full object-cover rounded-bl-lg"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute bottom-4 left-4">
          <p className="text-lg  text-white">Erika Mae Petero</p>
          <p className="text-white">Team Member</p>
        </div>
      </div>
      <div className="md:col-span-2 ">
        <h1 className="text-2xl mb-4">About Us</h1>
        <p className=" text-sm mb-10">
          We are the team behind the project—a group of BSIT students committed
          to developing a Footstep Power Generator using Arduino technology for
          our capstone endeavor.
        </p>
      </div>
    </div>
  );
}
