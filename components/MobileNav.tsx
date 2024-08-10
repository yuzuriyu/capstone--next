"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { PageContext } from "@/context/PageContext";
import { signOut } from "next-auth/react";
import Search from "./Search";

const MobileNav = () => {
  const pageContext = useContext(PageContext);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prevStatus) => !prevStatus);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prevStatus) => !prevStatus);
  };

  if (!pageContext) {
    // Handle the case where the PageContext is not provided
    return null;
  }

  const { activePage, handleActivePage } = pageContext;

  return (
    <>
      {isSearchOpen && <Search toggleSearch={toggleSearch} />}
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
          {/* Search */}
          <div onClick={toggleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="cursor-pointer hover:fill-customblue m-auto"
              fill={`${activePage === "Search" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Search</p>
          </div>

          {/* Other Links */}
          <Link href="/inbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => handleActivePage("Inbox")}
              className="m-auto group-hover:fill-customblue"
              fill={`${activePage === "Inbox" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5c0-1.103-.897-2-2-2zm-1 9h-3.142c-.446 1.722-1.997 3-3.858 3s-3.412-1.278-3.858-3H4V5h16v7h-1z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Inbox</p>
          </Link>

          <Link href="/guide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => handleActivePage("Guide")}
              fill={`${activePage === "Guide" ? "#4ABD4E" : "#A6ABC8"}`}
              className="m-auto group-hover:fill-customblue"
            >
              <path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Guide</p>
          </Link>

          <Link href="/contact" className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="m-auto group-hover:fill-customblue"
              onClick={() => handleActivePage("Contact")}
              fill={`${activePage === "Contact" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M20.487 17.14l-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Contact</p>
          </Link>

          <Link href="/" className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              onClick={() => handleActivePage("Profile")}
              viewBox="0 0 24 24"
              className="m-auto group-hover:fill-customblue"
              fill={`${activePage === "Profile" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Profile</p>
          </Link>

          <Link href="/settings" className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => handleActivePage("Settings")}
              className="m-auto group-hover:fill-customblue"
              fill={`${activePage === "Settings" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M12 8.007A3.991 3.991 0 0 0 8 12c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-3.993-4-3.993z"></path>
              <path d="M20 13.264V10.73l-2.001-.325c-.149-.515-.344-1.004-.58-1.462l1.28-1.635-1.8-1.8-1.636 1.279c-.459-.236-.948-.431-1.463-.58l-.324-2.003h-2.535l-.326 2.003c-.515.149-1.004.344-1.463.58L7.1 5.503l-1.8 1.8L6.579 8.94c-.236.458-.431.947-.58 1.462L4 10.729v2.535l2.001.325c.149.515.344 1.004.58 1.463l-1.279 1.636 1.8 1.8 1.635-1.279c.459.236.948.431 1.463.58l.324 2.002h2.535l.326-2.002c.515-.149 1.004-.344 1.463-.58l1.635 1.279 1.8-1.8-1.28-1.636c.236-.458.431-.947.58-1.463L20 13.265zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Settings</p>
          </Link>

          <button onClick={() => signOut()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="m-auto group-hover:fill-customblue"
              fill={`${activePage === "Logout" ? "#4ABD4E" : "#A6ABC8"}`}
            >
              <path d="M10 9v2h4V9h2v6h-2v-2h-4v2H8v-2h-.582c-.265-.04-.539-.079-.816-.115C7.192 14.253 8.479 16 10 16v2c-2.243 0-4.071-2.148-5.233-5H2v-2h2.767C5.929 8.148 7.757 6 10 6v2c-1.521 0-2.808 1.747-3.398 4H8V9h2z"></path>
              <path d="M18 12L12 7v3H8v4h4v3z"></path>
            </svg>
            <p className="text-xs text-gray-400 text-center mt-2">Logout</p>
          </button>
        </div>
      )}
    </>
  );
};

export default MobileNav;
