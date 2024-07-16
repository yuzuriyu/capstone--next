import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const DropDown = () => {
  return (
    <div className="absolute top-8 z-40 bg-white px-4 py-4 rounded-lg shadow-lg">
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
      <Link
        href={"/settings"}
        className="flex items-center mb-4 group cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#A6ABC8"
          className="group-hover:fill-customgreen"
        >
          <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
        </svg>
        <p className="text-sm ml-2 text-icongray group-hover:text-customgreen">
          Settings
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
