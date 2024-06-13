import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const DropDown = () => {
  return (
    <div className="absolute top-8 z-40 bg-white px-4 py-4 rounded-lg shadow-lg">
      <Link
        href={"/profile"}
        className="flex items-center mb-4 group cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#A6ABC8"
          className="group-hover:fill-customgreen"
        >
          <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
        </svg>
        <p className="text-sm ml-2 text-icongray group-hover:text-customgreen">
          Profile
        </p>
      </Link>
      <Link
        href={"/notification"}
        className="flex items-center mb-4 group cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#A6ABC8"
          className="group-hover:fill-customgreen"
        >
          <circle cx="18" cy="6" r="3"></circle>
          <path d="M13 6c0-.712.153-1.387.422-2H6c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7.422A4.962 4.962 0 0 1 18 11a5 5 0 0 1-5-5z"></path>
        </svg>
        <p className="text-sm ml-2 text-icongray group-hover:text-customgreen">
          Notification
        </p>
      </Link>
      <div
        className="flex items-center group cursor-pointer"
        onClick={() => signOut()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#A6ABC8"
          className="group-hover:fill-customgreen"
        >
          <path d="M5.002 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-14c-1.103 0-2 .897-2 2v6.001H10V7l6 5-6 5v-3.999H3.002V19c0 1.103.897 2 2 2z"></path>
        </svg>
        <p className="text-sm ml-2 text-icongray group-hover:text-customgreen">
          Logout
        </p>
      </div>
    </div>
  );
};

export default DropDown;
