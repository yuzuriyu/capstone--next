"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import Search from "./Search";
import DropDown from "./DropDown";

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen((prevStatus) => !prevStatus);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prevStatus) => !prevStatus);
  };

  if (!session) {
    return null; // No session available, render nothing
  }

  return (
    <div className="w-full py-2 fixed top-0 z-50 bg-matteblack bg-opacity-20 hover:bg-opacity-100 transition-all duration-300 ease-in-out hidden lg:block">
      {isSearchOpen && <Search toggleSearch={toggleSearch} />}
      <div className="flex justify-between md:w-8/12 m-auto items-center">
        <Image src={"/images/logo--silver.png"} alt="" width={50} height={50} />
        <div>
          <ul className="flex">
            <Link href={"/inbox"}>
              <li className="text-white mr-8 text-sm relative group">
                {" "}
                <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
                Inbox
              </li>
            </Link>

            {session?.user?.role !== "admin" && (
              <Link href={"/contact"}>
                <li className="text-white mr-8 text-sm relative group">
                  {" "}
                  <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
                  Contact
                </li>
              </Link>
            )}
            <Link href={"/about"}>
              <li className="text-white mr-8 text-sm relative group">
                {" "}
                <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
                About us
              </li>
            </Link>
          </ul>
        </div>

        <div className="flex items-center  ">
          {session?.user?.role === "admin" && (
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mr-4 hover:fill-customgreen cursor-pointer"
                fill="white"
                onClick={toggleSearch}
              >
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
              </svg>
            </div>
          )}
          <Link href={"/"}>
            <div className="h-[40px] w-[40px]">
              <Image
                src={
                  session.user.profilePicture || "/images/profile--default.jpg"
                }
                alt="Profile Picture"
                height={0}
                width={0}
                sizes="100vw"
                className="object-cover h-full w-full rounded-full"
              />
            </div>
          </Link>

          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="ml-4 cursor-pointer hover:fill-customgreen"
              fill="white"
              onClick={toggleDropDown}
            >
              <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
            </svg>
            {isDropDownOpen && <DropDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
