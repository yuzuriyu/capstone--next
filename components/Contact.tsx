"use client";

import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Session } from "next-auth";

interface ContactProps {
  session: Session | null;
}

const Contact: React.FC<ContactProps> = ({ session }) => {
  const [message, setMessage] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [errors, setErrors] = useState<{ subject: boolean; message: boolean }>({
    subject: false,
    message: false,
  });

  const getCurrentTimestamp = () => {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  };

  const submitForm = async () => {
    try {
      if (!message) {
        setNotice("Please fill in all required fields.");
        setErrors({
          subject: false,
          message: !message,
        });
        return;
      }

      if (!session) {
        setNotice("Session not found.");
        return;
      }

      const timestamp = getCurrentTimestamp();
      const senderName = session.user?.username || "";
      const profilePicture = session.user?.profilePicture || "";
      const senderEmail = session.user?.email || "";
      const recipientEmail = "admin";

      const fullFormData = {
        message,
        senderName,
        senderEmail,
        timeStamp: timestamp,
        recipientEmail,
        subject,
        adminPrivilege: false,
        profilePicture,
      };

      console.log("Full Form Data:", fullFormData);

      await fetch("/api/inquiries/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullFormData),
      });

      setNotice("Submitted Successfully");

      setMessage("");
      setSubject("");
      setErrors({
        subject: false,
        message: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotice("Error submitting form");
    }

    setTimeout(() => setNotice(""), 5000);
  };

  if (!session) {
    return <p>Please log in to submit a message.</p>;
  }

  return (
    <div className="">
      <div className="relative w-full md:h-[280px] h-[400px]">
        <Image
          src={"/images/contact.jpeg"}
          alt="Cover Photo"
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 w-8/12 text-right">
          <p className="text-4xl  mb-2 font-playfair ">Reach Out to Us</p>
          <p className="">
            Got a question or concern? Send us a message, and we&apos;ll get
            back to you shortly. Your voice matters!
          </p>
        </div>
      </div>
      <div className="bg-white w-full">
        <div className="w-11/12 lg:w-8/12 bg-white m-auto rounded-lg my-4">
          <div className="flex flex-col md:flex-row py-10">
            <div className="grid grid-cols-1 gap-8 md:w-1/2 mb-8">
              <div className="flex  items-center">
                <div className="mr-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#A6ABC8"
                  >
                    <path d="m12 17 1-2V9.858c1.721-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S8 3.794 8 6c0 1.858 1.279 3.411 3 3.858V15l1 2z"></path>
                    <path d="m16.267 10.563-.533 1.928C18.325 13.207 20 14.584 20 16c0 1.892-3.285 4-8 4s-8-2.108-8-4c0-1.416 1.675-2.793 4.267-3.51l-.533-1.928C4.197 11.54 2 13.623 2 16c0 3.364 4.393 6 10 6s10-2.636 10-6c0-2.377-2.197-4.46-5.733-5.437z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">Address</p>
                  <p className="text-sm">Camiling, Tarlac, Philippines</p>
                </div>
              </div>
              <div className="flex items-center ">
                <div className="mr-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#A6ABC8"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
                  </svg>
                </div>
                <div className="">
                  <p className="font-bold text-sm">Email</p>
                  <p className="text-sm">ccole@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col md:w-1/2">
              <p className="text-sm mb-2">Subject</p>
              <input
                type="text"
                placeholder="This is optional"
                className="border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <p className="text-sm mb-2">Message</p>
              <textarea
                placeholder="Hi! I'd like to ask about"
                className={`border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm ${
                  errors.message ? "border-red-500" : ""
                }`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                className="bg-customgreen text-white px-7 py-3 mt-4 rounded-lg w-[200px] mr-4 mb-4"
                onClick={submitForm}
              >
                Submit
              </button>
              <p
                className={`text-xs ${
                  notice === "Submitted Successfully"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {notice === "Submitted Successfully"
                  ? "Submitted Successfully"
                  : notice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
