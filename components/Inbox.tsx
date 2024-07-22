"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import EmailModal from "./EmailModal";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";

const Inbox = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [inquiries, setInquiries] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isSelectedEmailOpen, setIsSelectedEmailOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("received");
  const [isLoading, setIsLoading] = useState(true);

  const toggleEmailModal = () => {
    setIsSelectedEmailOpen((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (sessionStatus !== "loading" && session) {
      const fetchData = async () => {
        const response = await fetch("/api/inquiries/all");
        const data = await response.json();
        setInquiries(data);
        setIsLoading(false); // Set loading to false after data is fetched
      };
      fetchData();
    }
  }, [session, sessionStatus]);

  if (isLoading || sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userSentMessages = inquiries?.filter(
    (inquiry) => inquiry.senderEmail === session.user.email
  );

  const userReceivedMessages = inquiries?.filter(
    (inquiry) => inquiry.recipientEmail === session.user.email
  );

  const adminSentMessages = inquiries?.filter(
    (inquiry) =>
      inquiry.adminPrivilege && inquiry.senderEmail === session.user.email
  );

  const adminReceivedMessages = inquiries?.filter(
    (inquiry) => inquiry.recipientEmail === "admin"
  );

  const messagesToShow =
    session.user.role === "admin"
      ? activeCategory === "sent"
        ? adminSentMessages
        : adminReceivedMessages
      : activeCategory === "sent"
      ? userSentMessages
      : userReceivedMessages;

  return (
    <div className="w-11/12 m-auto lg:w-8/12 py-20">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <div className="flex mb-4 bg-white py-4 px-4 rounded-lg">
            <div>
              <div
                className="flex items-center pb-4 group"
                onClick={() => setActiveCategory("received")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mr-4 group-hover:fill-customgreen"
                  fill={activeCategory === "received" ? "#4ABD4E" : "#A6ABC8"}
                >
                  <path d="M20 3H4c-1.103 0-2 .897-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5c0-1.103-.897-2-2-2zm-1 9h-3.142c-.446 1.722-1.997 3-3.858 3s-3.412-1.278-3.858-3H4V5h16v7h-1z"></path>
                </svg>
                <p
                  className={`group-hover:text-customgreen ${
                    activeCategory === "received"
                      ? "text-customgreen"
                      : "text-icongray"
                  }`}
                >
                  Inbox
                </p>
              </div>
              <div
                className="flex items-center group"
                onClick={() => setActiveCategory("sent")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mr-4 group-hover:fill-customgreen"
                  fill={activeCategory === "sent" ? "#4ABD4E" : "#A6ABC8"}
                >
                  <path d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z"></path>
                  <path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path>
                </svg>
                <p
                  className={`group-hover:text-customgreen ${
                    activeCategory === "sent"
                      ? "text-customgreen"
                      : "text-icongray"
                  }`}
                >
                  Sent
                </p>
              </div>
            </div>
          </div>

          <div className="grid w-full m-auto gap-4 grid-cols-1">
            {messagesToShow?.length > 0 ? (
              messagesToShow.map((inquiry) => (
                <div
                  className="rounded-lg py-4 px-4 flex items-center relative bg-white"
                  onClick={() => {
                    setSelectedEmail(inquiry);
                    toggleEmailModal();
                  }}
                  key={inquiry._id}
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
                      <p>{inquiry.senderName}</p>
                      <p className="text-xs">{inquiry.timeStamp}</p>
                    </div>
                    <div>
                      <p className="text-xs">{inquiry.message}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages to show.</p>
            )}
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
