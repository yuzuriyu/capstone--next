"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Settings = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const currentUsername = session?.user?.username;

  const currentEmail = session?.user?.email;

  const currentBio = session?.user?.bio;

  const currentprofilePicture = session?.user?.profilePicture;
  return (
    <div className="w-11/12 lg:w-8/12 m-auto lg:my-24 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 py-8 lg:py-0">
        <p className="text-lg font-bold">Settings</p>
      </div>
      <div className=" bg-white flex-1 px-4 py-4 rounded-lg ">
        <div className="mb-4">
          <p className="mb-4 text-sm font-bold">Username</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm  rounded-lg"
            value={currentUsername}
          />
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm font-bold">Email</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full  rounded-lg"
            value={currentEmail}
          />
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm font-bold">Change Password</p>
          <input
            placeholder="New password"
            className="bg-bggray px-4 py-2 w-full text-sm  mb-4 rounded-lg"
          />
          <input
            placeholder="Confirm new password"
            className="bg-bggray px-4 py-2 text-sm w-full  rounded-lg"
          />
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm font-bold">About</p>
          <textarea
            placeholder=""
            className="bg-bggray px-4 py-2 w-full  text-sm  rounded-lg"
            value={currentBio}
          />
        </div>
        <div className="mb-4">
          <p className=" text-sm font-bold">Avatar</p>
          <p className="text-sm mb-4">
            Allowed Formts: JPEG, PNG. Max size: 3mb. Optimal
          </p>
          <div className="flex flex-col gap-4 lg:flex-row">
            <Image
              src={"/images/upload.JPG"}
              alt=""
              width={200}
              height={200}
              className="object-cover"
            />

            <Image
              src={currentprofilePicture}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="mb-4">
          <p className=" text-sm font-bold">Banner</p>
          <p className="text-sm mb-4">
            Allowed Formts: JPEG, PNG. Max size: 3mb. Optimal
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
            <Image
              src={"/images/upload.JPG"}
              alt=""
              width={200}
              height={200}
              className="object-cover"
            />
            <div>
              <Image
                src={"/images/city.jpg"}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg h-[200px] w-[200px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
