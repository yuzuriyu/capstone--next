"use client";

import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Image from "next/image";
import Link from "next/link";
import { PageContextType } from "@/app/interfaces";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
const Sidebar = () => {
  const contextValue = useContext<PageContextType | undefined>(PageContext);

  if (!contextValue) {
    return null;
  }

  const { data: session } = useSession();

  const { handleActivePage, activePage } = contextValue;

  if (!session) {
    return null;
  }
  return (
    <div className="border-r h-full hidden md:block relative">
      <div className="w-10/12 py-2 m-auto">
        <Link href={"/profile"} className="flex items-center pt-4 pb-6 px-4">
          <Image
            src={session?.user?.profilePicture}
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />
          <p className="ml-2">{session?.user?.username}</p>
        </Link>
        {session?.user?.role === "admin" && (
          <Link
            href={"/"}
            className={`flex items-center pb-6 px-4 group ${
              activePage === "Admin Panel" ? "" : ""
            }`}
            onClick={() => handleActivePage("Dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-4 group-hover:fill-customblue"
              fill={`${activePage === "Analysis" ? "#2FBFDE" : "#A6ABC8"}`}
            >
              <path d="M4.626 8.878a7.937 7.937 0 0 1 1.71-2.541 7.92 7.92 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.49 2.49 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059-1.19.5-2.26 1.22-3.18 2.139A9.98 9.98 0 0 0 2 12h2c0-1.086.211-2.136.626-3.122zm14.747 6.244c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.973 9.973 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z"></path>
              <path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538c2.502 0 4.538-2.036 4.538-4.538S14.502 7.462 12 7.462z"></path>
            </svg>
            <p>Admin Panel</p>
          </Link>
        )}

        <Link
          href={"/"}
          className={`flex items-center pb-6 px-4 group ${
            activePage === "Dashboard" ? "" : ""
          }`}
          onClick={() => handleActivePage("Dashboard")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4 group-hover:fill-customblue"
            fill={`${activePage === "Dashboard" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
          </svg>
          <p>Dashboard</p>
        </Link>
        <Link
          href={"/inbox"}
          className={`flex items-center pb-6 px-4 group ${
            activePage === "Dashboard" ? "" : ""
          }`}
          onClick={() => handleActivePage("Inbox")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4 group-hover:fill-customblue"
            fill={`${activePage === "Inbox" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="M20 3H4c-1.103 0-2 .897-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5c0-1.103-.897-2-2-2zm-1 9h-3.142c-.446 1.722-1.997 3-3.858 3s-3.412-1.278-3.858-3H4V5h16v7h-1z"></path>
          </svg>
          <p>Inbox</p>
        </Link>
        <Link
          href={"/guide"}
          className={`flex items-center pb-6  px-4 group ${
            activePage === "Guide" ? "" : ""
          }`}
          onClick={() => handleActivePage("Guide")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={`${activePage === "Guide" ? "#2FBFDE" : "#A6ABC8"}`}
            className="mr-4 group-hover:fill-customblue"
          >
            <path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path>
          </svg>
          <p>Guide</p>
        </Link>
        <Link
          href={"/contact"}
          className={`flex items-center pb-6  px-4 group ${
            activePage === "Contact" ? "" : ""
          }`}
          onClick={() => handleActivePage("Contact")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4 group-hover:fill-customblue"
            fill={`${activePage === "Contact" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
          </svg>
          <p className={``}>Contact</p>
        </Link>
        <Link
          href={"/about"}
          className={`flex items-center px-4 group  ${
            activePage === "About" ? "" : ""
          }`}
          onClick={() => handleActivePage("About")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-4 group-hover:fill-customblue"
            fill={`${activePage === "About" ? "#2FBFDE" : "#A6ABC8"}`}
          >
            <path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path>
            <path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path>
          </svg>
          <p>About us</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
