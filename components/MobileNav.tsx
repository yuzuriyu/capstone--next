"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { PageContext } from "@/context/PageContext";
import { signOut } from "next-auth/react";
import Search from "./Search";

const MobileNav = () => {
  const { activePage, handleActivePage } = useContext(PageContext);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleSearch = () => {
    setIsSearchOpen((prevStatus) => !prevStatus);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prevStatus) => !prevStatus);
  };

  return (
    <>
      {isSearchOpen && <Search />}
      {!isMobileNavOpen && (
        <div
          className="fixed bottom-4 right-0 lg:hidden z-50 shadow-2xl"
          onClick={toggleMobileNav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="#4ABD4E"
            className="bg-white p-1 rounded-lg"
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
          </svg>
        </div>
      )}
      {isMobileNavOpen && (
        <div className="grid grid-cols-3 bg-white py-4 px-4 rounded-lg fixed bottom-4 right-0 lg:hidden z-50 shadow-2xl gap-3">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className=" cursor-pointer hover:fill-customblue m-auto"
              fill={`${activePage === "Search" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Search</p>
          </div>
          <Link href={"/inbox"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => handleActivePage("Inbox")}
              className=" m-auto group-hover:fill-customblue"
              fill={`${activePage === "Inbox" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5c0-1.103-.897-2-2-2zm-1 9h-3.142c-.446 1.722-1.997 3-3.858 3s-3.412-1.278-3.858-3H4V5h16v7h-1z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Inbox</p>
          </Link>
          <Link href={"/guide"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => handleActivePage("Guide")}
              fill={`${activePage === "Guide" ? "#4ABD4E" : "#A6ABC8"}`}
              className=" m-auto group-hover:fill-customblue"
            >
              <path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Guide</p>
          </Link>
          <Link href={"/contact"} className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className=" m-auto group-hover:fill-customblue"
              onClick={() => handleActivePage("Contact")}
              fill={`${activePage === "Contact" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
            </svg>
            <p className={`text-xs text-gray-400 text-center mt-2`}>Contact</p>
          </Link>
          <Link href={"/"} className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              onClick={() => handleActivePage("Profile")}
              viewBox="0 0 24 24"
              className=" m-auto group-hover:fill-customblue"
              fill={`${activePage === "Profile" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Profile</p>
          </Link>
          <Link href={"/settings"} className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => handleActivePage("Settings")}
              className=" m-auto group-hover:fill-customblue"
              fill={`${activePage === "Settings" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Settings</p>
          </Link>
          <Link href={"/about"} className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => handleActivePage("About")}
              fill={`${activePage === "About" ? "#4ABD4E" : "#A6ABC8"}`}
              className=" m-auto group-hover:fill-customblue"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">About</p>
          </Link>

          <div className="mt-2" onClick={() => signOut()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#A6ABC8"
              className=" cursor-pointer m-auto"
            >
              <path d="M5.002 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-14c-1.103 0-2 .897-2 2v6.001H10V7l6 5-6 5v-3.999H3.002V19c0 1.103.897 2 2 2z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Logout</p>
          </div>
          <div onClick={toggleMobileNav} className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className=" cursor-pointer hover:fill-customblue m-auto"
              fill="#A6ABC8"
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Close</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
