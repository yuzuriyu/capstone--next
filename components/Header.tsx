"use client";

import React, { useState } from "react";
import logo from "../assets/react.svg";
import menu from "../assets/menu--light.png";
import ToggleMenu from "./ToggleMenu";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners"; // Import the spinner

const Header = () => {
  const [isToggleMenuOpen, setIsToggleMenu] = useState(false);
  const { data: session } = useSession();

  const handleToggleMenu = () => {
    setIsToggleMenu((prevStatus) => !prevStatus);
  };

  if (!session) {
    return null;
  }
  console.log(session?.user);
  return (
    <div className="w-full bg-bggray py-2 md:bg-white border-b ">
      <div className="flex md:justify-end justify-between w-11/12 m-auto items-center">
        <svg
          height="50"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 512 309"
          width="50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m120.81043 80.5613102h96.567895v7.6753487h-87.715838v57.7670991h82.485077v7.675348h-82.485077v63.422619h88.721754v7.675348h-97.573811zm105.21877 0h10.260338l45.467384 63.4226188 46.4733-63.4226188 63.211264-80.5613102-103.850254 150.649363 53.514709 74.12771h-10.662704l-48.686315-67.462275-48.887497 67.462275h-10.461521l53.917074-74.12771zm118.899221 7.6753486v-7.6753486h110.047164v7.6753487h-50.698145v136.5404141h-8.852058v-136.5404141zm-344.928421-7.6753486h11.0650714l152.5808586 228.3226968-63.054372-84.106934-91.33713469-133.3086883-.40236623 133.3086883h-8.85205708zm454.083705 134.2241588c-1.808538 0-3.164943-1.401289-3.164943-3.212184 0-1.810897 1.356405-3.212186 3.164943-3.212186 1.830069 0 3.164943 1.401289 3.164943 3.212186 0 1.810895-1.334874 3.212184-3.164943 3.212184zm8.69821-8.450851h4.736648c.06459 2.565437 1.937721 4.290101 4.693588 4.290101 3.078821 0 4.822769-1.854014 4.822769-5.324899v-21.989457h4.82277v22.011016c0 6.251906-3.617077 9.852139-9.602478 9.852139-5.619388 0-9.473297-3.492442-9.473297-8.8389zm25.38413-.280256h4.779709c.409074 2.953486 3.294124 4.829057 7.449457 4.829057 3.875441 0 6.717429-2.004921 6.717429-4.764383 0-2.371411-1.808538-3.794259-5.920812-4.764383l-4.004619-.970122c-5.619389-1.315057-8.181486-4.031402-8.181486-8.601759 0-5.540482 4.521348-9.226949 11.303367-9.226949 6.308355 0 10.915822 3.686467 11.195715 8.925132h-4.693588c-.452134-2.867252-2.949641-4.65659-6.566718-4.65659-3.810849 0-6.351414 1.832454-6.351414 4.635033 0 2.220503 1.636295 3.492442 5.683978 4.441008l3.423305.840772c6.372946 1.487524 8.999632 4.074517 8.999632 8.752668 0 5.950089-4.607467 9.679672-11.970803 9.679672-6.889671 0-11.518667-3.557118-11.863152-9.119156z" />
        </svg>
        <div className="flex justify-end items-center w-full ">
          <Link href="/achivements">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mr-4"
              fill="#A6ABC8"
            >
              <path d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.8 6.91 4.82 7A6 6 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09A6 6 0 0 0 17.18 15c3-.1 4.82-2.7 4.82-7V5a1 1 0 0 0-1-1zM4 8V6h2v6.83C4.22 12.08 4 9.3 4 8zm14 4.83V6h2v2c0 1.3-.22 4.08-2 4.83z"></path>
            </svg>
          </Link>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#A6ABC8"
            viewBox="0 0 24 24"
          >
            <path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path>
          </svg>
          <Image
            src={session?.user?.profilePicture}
            alt=""
            width={40}
            height={40}
            className="rounded-full ml-4 mr-2 cursor-pointer"
            onClick={handleToggleMenu}
          />
        </div>
      </div>
      {isToggleMenuOpen && <ToggleMenu />}
    </div>
  );
};

export default Header;
