"use client";
import Image from "next/image";
import { useState } from "react";
import ToggleMenu from "./ToggleMenu";

const Header = () => {
  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsToggleMenuOpen((prevStatus) => !prevStatus);
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-300 via-orange-300 py-4 md:hidden">
      <div className="flex justify-between w-11/12 m-auto md:w-10/12 items-center">
        <Image src="/icons/next--white.svg" alt="" width={40} height={50} />
        <Image
          src="/icons/bx-menu-alt-left.svg"
          alt=""
          width={28}
          height={28}
          onClick={() => setIsToggleMenuOpen((prevStatus) => !prevStatus)}
        />
      </div>
      {isToggleMenuOpen && <ToggleMenu handleToggleMenu={handleToggleMenu} />}
    </div>
  );
};

export default Header;
