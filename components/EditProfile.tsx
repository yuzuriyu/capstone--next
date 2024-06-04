"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

interface Props {
  toggleEditProfile: () => void;
}

const EditProfile: React.FC<Props> = ({ toggleEditProfile }) => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }
  return (
    <div className="absolute z-50 top-0 lg:h-[550px] rounded-lg lg:overflow-auto bg-white lg:w-1/3 lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2">
      <div className="w-full bg-white py-2">
        <div className="justify-between w-11/12 m-auto flex">
          <div className="flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-8"
              onClick={toggleEditProfile}
            >
              <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
            </svg>
            <p className="font-bold">Edit profile</p>
          </div>
          <button className="border border-customblue text-sm text-customblue rounded-full px-4 py-1">
            Save
          </button>
        </div>
      </div>

      <div className="relative h-[150px] w-full">
        <Image
          src={"/images/city.jpg"}
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />

        <div className="absolute -bottom-14 md:left-12 left-4 flex items-center">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg"
            >
              <path d="M12 8c-2.168 0-4 1.832-4 4s1.832 4 4 4 4-1.832 4-4-1.832-4-4-4zm0 6c-1.065 0-2-.935-2-2s.935-2 2-2 2 .935 2 2-.935 2-2 2z"></path>
              <path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 18V7h3c.266 0 .52-.105.707-.293L10.414 4h3.172l2.707 2.707A.996.996 0 0 0 17 7h3l.002 11H4z"></path>
            </svg>
            <Image
              src={session?.user?.profilePicture}
              alt=""
              height={100}
              width={100}
              className="rounded-lg p-1 bg-white"
            />
          </div>
        </div>
      </div>
      <div className="w-11/12 m-auto py-20">
        <input
          placeholder="Name"
          className="border rounded-lg w-full px-2 py-2 mb-4"
        />
        <textarea
          className="border rounded-lg w-full px-2 py-2 mb-4"
          placeholder="Bio"
        />
        <input
          placeholder="Title"
          className="border rounded-lg w-full px-2 py-2 mb-4"
        />
        <input
          placeholder="Location"
          className="border rounded-lg w-full px-2 py-2 mb-4"
        />
        <input
          placeholder="Birthday"
          className="border rounded-lg w-full px-2 py-2 mb-4"
        />
        <input
          placeholder="Phone Number"
          className="border rounded-lg w-full px-2 py-2 mb-4"
        />
      </div>
    </div>
  );
};

export default EditProfile;
