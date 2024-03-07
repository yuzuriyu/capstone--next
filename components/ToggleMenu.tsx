"use client";
import { ToggleMenuProps } from "@/app/interfaces";
import { PageContext } from "@/context/PageContext";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useContext } from "react";

const ToggleMenu: React.FC<ToggleMenuProps> = (props) => {
  const page = useContext(PageContext);
  const toggle: MouseEventHandler<HTMLDivElement> = () => {
    props.handleToggleMenu();
  };
  return (
    <div className="flex h-full w-full absolute top-0 z-50">
      <div className="bg-gradient-to-r from-red-300 via-orange-300 w-2/3">
        <div className="w-10/12 m-auto py-4">
          <div className="flex items-center mb-4">
            <Image
              src="/icons/next--white.svg"
              alt=""
              className="mr-4"
              width={100}
              height={50}
            />
          </div>
          <Link
            href={"/"}
            className={`flex items-center py-4  px-4 mb-2   ${
              page?.activePage === "overview" ? "border-b border-white" : ""
            }`}
            onClick={() => page?.handleActivePage("overview")}
          >
            <Image
              src="/icons/bxs-dashboard.svg"
              alt=""
              className="mr-4"
              width={28}
              height={28}
            />
            <p className="text-white">Overview</p>
          </Link>
          <Link
            href={"/about"}
            className={`flex items-center py-4  px-4 ${
              page?.activePage === "about" ? "border-b border-white" : ""
            }`}
            onClick={() => page?.handleActivePage("about")}
          >
            <Image
              src="/icons/bx-group.svg"
              alt=""
              className="mr-4"
              width={28}
              height={28}
            />
            <p className="text-white">About Us</p>
          </Link>
          <Link
            href={"/contact"}
            className={`flex items-center py-4  px-4 ${
              page?.activePage === "contact" ? "border-b border-white" : ""
            }`}
            onClick={() => page?.handleActivePage("contact")}
          >
            <Image
              src="/icons/bx-phone-call.svg"
              alt=""
              className="mr-4"
              width={28}
              height={28}
            />
            <p className="text-white">Contact</p>
          </Link>
          <Link
            href={"/details"}
            className={`flex items-center py-4  px-4 ${
              page?.activePage === "details" ? "border-b border-white" : ""
            }`}
            onClick={() => page?.handleActivePage("details")}
          >
            <Image
              src="/icons/bx-detail.svg"
              alt=""
              className="mr-4"
              width={28}
              height={28}
            />
            <p className="text-white">Details</p>
          </Link>

          <Link
            href={"/guide"}
            className={`flex items-center py-4  px-4 ${
              page?.activePage === "guide" ? "border-b border-white" : ""
            }`}
            onClick={() => page?.handleActivePage("guide")}
          >
            <Image
              src="/icons/bx-help-circle.svg"
              alt=""
              className="mr-4"
              width={28}
              height={28}
            />
            <p className="text-white">Guide</p>
          </Link>
          <Link
            href={"/gallery"}
            className={`flex items-center py-4  px-4 ${
              page?.activePage === "gallery" ? "border-b border-white" : ""
            }`}
            onClick={() => page?.handleActivePage("gallery")}
          >
            <Image
              src="/icons/bx-collection.svg"
              alt=""
              className="mr-4"
              width={28}
              height={28}
            />
            <p className="text-white">Gallery</p>
          </Link>
        </div>
      </div>
      <div className="flex-1" onClick={toggle}></div>
    </div>
  );
};

export default ToggleMenu;
