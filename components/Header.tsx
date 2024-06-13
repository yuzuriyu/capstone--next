"use client";

import React, { useState } from "react";

import ToggleMenu from "./ToggleMenu";
import Image from "next/image";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Search from "./Search";
import DropDown from "./DropDown";

const Header = () => {
  const { data: session } = useSession();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen((prevStatus) => !prevStatus);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prevStatus) => !prevStatus);
  };

  if (!session) {
    return null;
  }
  console.log(session?.user);

  return (
    <div className="w-full py-2 fixed top-0 z-50 bg-matteblack bg-opacity-20 hover:bg-opacity-100 transition-all duration-300 ease-in-out hidden lg:block">
      {isSearchOpen && <Search toggleSearch={toggleSearch} />}
      <div className="flex justify-between md:w-8/12 m-auto items-center">
        <Link href={"/"}>
          <svg
            height="50"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 512 309"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <path d="m120.81043 80.5613102h96.567895v7.6753487h-87.715838v57.7670991h82.485077v7.675348h-82.485077v63.422619h88.721754v7.675348h-97.573811zm105.21877 0h10.260338l45.467384 63.4226188 46.4733-63.4226188 63.211264-80.5613102-103.850254 150.649363 53.514709 74.12771h-10.662704l-48.686315-67.462275-48.887497 67.462275h-10.461521l53.917074-74.12771zm118.899221 7.6753486v-7.6753486h110.047164v7.6753487h-50.698145v136.5404141h-8.852058v-136.5404141zm-344.928421-7.6753486h11.0650714l152.5808586 228.3226968-63.054372-84.106934-91.33713469-133.3086883-.40236623 133.3086883h-8.85205708zm454.083705 134.2241588c-1.808538 0-3.164943-1.401289-3.164943-3.212184 0-1.810897 1.356405-3.212186 3.164943-3.212186 1.830069 0 3.164943 1.401289 3.164943 3.212186 0 1.810895-1.334874 3.212184-3.164943 3.212184zm8.69821-8.450851h4.736648c.06459 2.565437 1.937721 4.290101 4.693588 4.290101 3.078821 0 4.822769-1.854014 4.822769-5.324899v-21.989457h4.82277v22.011016c0 6.251906-3.617077 9.852139-9.602478 9.852139-5.619388 0-9.473297-3.492442-9.473297-8.8389zm25.38413-.280256h4.779709c.409074 2.953486 3.294124 4.829057 7.449457 4.829057 3.875441 0 6.717429-2.004921 6.717429-4.764383 0-2.371411-1.808538-3.794259-5.920812-4.764383l-4.004619-.970122c-5.619389-1.315057-8.181486-4.031402-8.181486-8.601759 0-5.540482 4.521348-9.226949 11.303367-9.226949 6.308355 0 10.915822 3.686467 11.195715 8.925132h-4.693588c-.452134-2.867252-2.949641-4.65659-6.566718-4.65659-3.810849 0-6.351414 1.832454-6.351414 4.635033 0 2.220503 1.636295 3.492442 5.683978 4.441008l3.423305.840772c6.372946 1.487524 8.999632 4.074517 8.999632 8.752668 0 5.950089-4.607467 9.679672-11.970803 9.679672-6.889671 0-11.518667-3.557118-11.863152-9.119156z" />
          </svg>
        </Link>
        <div>
          <ul className="flex">
            <Link href={"/"}>
              <div className="text-white mr-8 text-sm relative group">
                Home
                <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
              </div>
            </Link>
            <Link href={"/inbox"}>
              <li className="text-white mr-8 text-sm relative group">
                {" "}
                <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
                Inbox
              </li>
            </Link>
            <Link href={"/achievements"}>
              <li className="text-white mr-8 text-sm relative group">
                {" "}
                <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
                Achievements
              </li>
            </Link>
            <Link href={"/guide"}>
              <li className="text-white mr-8 text-sm relative group">
                {" "}
                <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
                Guide
              </li>
            </Link>
            <Link href={"/contact"}>
              <li className="text-white mr-8 text-sm relative group">
                {" "}
                <div className="w-0 left-0 bottom-0 absolute transition-all ease-in-out duration-300 border-b border-white group-hover:w-full"></div>
                Contact
              </li>
            </Link>
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
          <Link href={"/profile"}>
            <Image
              src={session?.user?.profilePicture}
              alt=""
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
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
