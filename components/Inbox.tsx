"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import EmailModal from "./EmailModal";

const Inbox = () => {
  const [inquiries, setInquiries] = useState();
  const [selectedEmail, setSelectedEmail] = useState();
  const [isSelectedEmailOpen, setIsSelectedEmailOpen] = useState(false);

  const toggleEmailModal = () => {
    setIsSelectedEmailOpen((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/inquiries/all")
        .then((res) => res.json())
        .then((data) => setInquiries(data));
    };
    fetchData();
    console.log(inquiries);
  }, []);

  console.log(selectedEmail);
  return (
    <div className="w-11/12 m-auto lg:w-8/12 py-20">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <div className="w-full flex rounded-lg px-4 items-center mb-8 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mr-2"
              fill="#A6ABC8"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
            <input
              placeholder="Search"
              className="rounded-lg flex-1 py-2  focus:outline-none"
            />
          </div>
          <div className="grid w-full m-auto gap-4 grid-cols-1 ">
            {inquiries?.map((inquiry) => (
              <div
                className=" rounded-lg py-4 px-4 flex items-center relative bg-white"
                onClick={() => {
                  setSelectedEmail(inquiry);
                  toggleEmailModal();
                }}
              >
                <div>
                  <Image
                    src={inquiry.profilePicture}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p>{inquiry.name}</p>
                    <p className="text-xs">{inquiry.timeStamp}</p>
                  </div>
                  <div>
                    <p className="text-xs">{inquiry.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <EmailModal
          toggleEmailModal={toggleEmailModal}
          selectedEmail={selectedEmail}
        />
      </div>
    </div>
  );
};

export default Inbox;
