"use client";

import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Link from "next/link";
import { PageContextType } from "@/app/interfaces";

const ToggleMenu = () => {
  const contextValue = useContext<PageContextType | undefined>(PageContext);

  // Check if contextValue is undefined
  if (!contextValue) {
    // Handle the case where contextValue is undefined
    return null; // Or any other fallback UI
  }

  // Destructure handleActivePage and activePage from contextValue
  const { handleActivePage, activePage } = contextValue;

  return (
    <div className="bg-bggray h-full absolute z-50 w-2/3 right-0">
      <div className="w-10/12 m-auhref py-4">
        <div className="flex items-center py-8 px-4">
          <svg
            height="75"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 512 309"
            width="75"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m120.81043 80.5613102h96.567895v7.6753487h-87.715838v57.7670991h82.485077v7.675348h-82.485077v63.422619h88.721754v7.675348h-97.573811zm105.21877 0h10.260338l45.467384 63.4226188 46.4733-63.4226188 63.211264-80.5613102-103.850254 150.649363 53.514709 74.12771h-10.662704l-48.686315-67.462275-48.887497 67.462275h-10.461521l53.917074-74.12771zm118.899221 7.6753486v-7.6753486h110.047164v7.6753487h-50.698145v136.5404141h-8.852058v-136.5404141zm-344.928421-7.6753486h11.0650714l152.5808586 228.3226968-63.054372-84.106934-91.33713469-133.3086883-.40236623 133.3086883h-8.85205708zm454.083705 134.2241588c-1.808538 0-3.164943-1.401289-3.164943-3.212184 0-1.810897 1.356405-3.212186 3.164943-3.212186 1.830069 0 3.164943 1.401289 3.164943 3.212186 0 1.810895-1.334874 3.212184-3.164943 3.212184zm8.69821-8.450851h4.736648c.06459 2.565437 1.937721 4.290101 4.693588 4.290101 3.078821 0 4.822769-1.854014 4.822769-5.324899v-21.989457h4.82277v22.011016c0 6.251906-3.617077 9.852139-9.602478 9.852139-5.619388 0-9.473297-3.492442-9.473297-8.8389zm25.38413-.280256h4.779709c.409074 2.953486 3.294124 4.829057 7.449457 4.829057 3.875441 0 6.717429-2.004921 6.717429-4.764383 0-2.371411-1.808538-3.794259-5.920812-4.764383l-4.004619-.970122c-5.619389-1.315057-8.181486-4.031402-8.181486-8.601759 0-5.540482 4.521348-9.226949 11.303367-9.226949 6.308355 0 10.915822 3.686467 11.195715 8.925132h-4.693588c-.452134-2.867252-2.949641-4.65659-6.566718-4.65659-3.810849 0-6.351414 1.832454-6.351414 4.635033 0 2.220503 1.636295 3.492442 5.683978 4.441008l3.423305.840772c6.372946 1.487524 8.999632 4.074517 8.999632 8.752668 0 5.950089-4.607467 9.679672-11.970803 9.679672-6.889671 0-11.518667-3.557118-11.863152-9.119156z" />
          </svg>
        </div>
        <Link
          href={"/"}
          className={`flex items-center py-4  px-4 mb-2  ${
            activePage === "Overview" ? "" : ""
          }`}
          onClick={() => handleActivePage("Overview")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4"
            fill={`${activePage === "Overview" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
          </svg>
          <p
            className={`${
              activePage === "Overview" ? "text-customblue" : "text-textgray"
            }`}
          >
            Overview
          </p>
        </Link>
        <Link
          href={"/about"}
          className={`flex items-center py-4  px-4 ${
            activePage === "About" ? "" : ""
          }`}
          onClick={() => handleActivePage("About")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4"
            fill={`${activePage === "About" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path>
            <path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path>
          </svg>
          <p
            className={`${
              activePage === "About us" ? "text-customblue" : "text-textgray"
            }`}
          >
            About us
          </p>
        </Link>
        <Link
          href={"/contact"}
          className={`flex items-center py-4  px-4 ${
            activePage === "Contact" ? "" : ""
          }`}
          onClick={() => handleActivePage("Contact")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4"
            fill={`${activePage === "Contact" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
          </svg>
          <p
            className={`${
              activePage === "Contact" ? "text-customblue" : "text-textgray"
            }`}
          >
            Contact
          </p>
        </Link>
        <Link
          href={"/details"}
          className={`flex items-center py-4  px-4 ${
            activePage === "Details" ? "" : ""
          }`}
          onClick={() => handleActivePage("Details")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4"
            fill={`${activePage === "Details" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14H5v-2h6v2zm8-4H5v-2h14v2zm0-4H5V7h14v2z"></path>
          </svg>
          <p
            className={`${
              activePage === "Details" ? "text-customblue" : "text-textgray"
            }`}
          >
            Details
          </p>
        </Link>

        <Link
          href={"/guide"}
          className={`flex items-center py-4  px-4 ${
            activePage === "How it Works" ? "" : ""
          }`}
          onClick={() => handleActivePage("How it Works")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4"
            fill={`${activePage === "How it Works" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
          </svg>
          <p
            className={`${
              activePage === "How it Works"
                ? "text-customblue"
                : "text-textgray"
            }`}
          >
            Functionality
          </p>
        </Link>
        <Link
          href={"/gallery"}
          className={`flex items-center py-4  px-4 ${
            activePage === "Gallery" ? "" : ""
          }`}
          onClick={() => handleActivePage("Gallery")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4"
            fill={`${activePage === "Gallery" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 6h14v2H5zm2-4h10v2H7z"></path>
          </svg>
          <p
            className={`${
              activePage === "Gallery" ? "text-customblue" : "text-textgray"
            }`}
          >
            Gallery
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ToggleMenu;
