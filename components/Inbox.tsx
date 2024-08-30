"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import EmailModal from "@/components/EmailModal";
import { ClipLoader } from "react-spinners";
import { EmailData } from "@/app/interfaces";
import { Inquiry } from "@/app/interfaces";

interface InboxProps {
  session: Session | null;
}

const Inbox: React.FC<InboxProps> = ({ session }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  const [isSelectedEmailOpen, setIsSelectedEmailOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("received");
  const [isLoading, setIsLoading] = useState(true);

  const toggleEmailModal = () => {
    setIsSelectedEmailOpen((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const response = await fetch("/api/inquiries/all");
        const data: Inquiry[] = await response.json();
        setInquiries(data);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} />
      </div>
    );
  }

  const userSentMessages = inquiries.filter(
    (inquiry) => inquiry.senderEmail === session.user?.email
  );

  const userReceivedMessages = inquiries.filter(
    (inquiry) => inquiry.recipientEmail === session.user?.email
  );

  const adminSentMessages = inquiries.filter(
    (inquiry) =>
      inquiry.adminPrivilege && inquiry.senderEmail === session.user?.email
  );

  const adminReceivedMessages = inquiries.filter(
    (inquiry) => inquiry.recipientEmail === "admin"
  );

  const messagesToShow =
    session.user?.role === "admin"
      ? activeCategory === "sent"
        ? adminSentMessages
        : adminReceivedMessages
      : activeCategory === "sent"
      ? userSentMessages
      : userReceivedMessages;

  const handleEmailClick = (inquiry: Inquiry) => {
    const emailData: EmailData = {
      senderName: inquiry.senderName,
      senderEmail: inquiry.senderEmail,
      profilePicture: inquiry.profilePicture,
      timeStamp: inquiry.timeStamp,
      subject: inquiry.subject,
      message: inquiry.message,
    };
    setSelectedEmail(emailData);
    toggleEmailModal();
  };

  return (
    <div className="w-11/12 m-auto lg:w-8/12 py-20">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="lg:w-1/3 rounded-lg overflow-hidden">
          <div className=" bg-white py-4 px-4">
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
                  className="mr-2 group-hover:fill-customgreen cursor-pointer"
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
                  className={`group-hover:text-customgreen mr-2 ${
                    activeCategory === "sent"
                      ? "text-customgreen"
                      : "text-icongray"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={activeCategory === "sent" ? "#4ABD4E" : "#A6ABC8"}
                >
                  <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
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
        </div>

        <div className="lg:w-2/3 rounded-lg">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader size={50} />
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              {messagesToShow.length === 0 ? (
                <div className="bg-white p-4 rounded-lg ">
                  <p>No messages to show</p>
                </div>
              ) : (
                messagesToShow.map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className="bg-white p-4 border-b cursor-pointer "
                    onClick={() => handleEmailClick(inquiry)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Image
                          src={
                            inquiry.profilePicture ||
                            "/images/profile--default.jpg"
                          }
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full mr-2"
                        />
                        <div>
                          <p className="font-bold">{inquiry.senderName}</p>
                          <p className="text-gray-500 text-xs">
                            {inquiry.senderEmail}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {inquiry.timeStamp}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-bold ">{inquiry.subject}</p>
                      <p className="text-sm">{inquiry.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {isSelectedEmailOpen && selectedEmail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <EmailModal
            selectedEmail={selectedEmail}
            toggleEmailModal={toggleEmailModal}
          />
        </div>
      )}
    </div>
  );
};

export default Inbox;
