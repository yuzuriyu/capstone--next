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
      // Checking if any of the fields are empty
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
      const senderName = session.user?.name || ""; // Use session user's name
      const profilePicture = session.user?.image || ""; // Use session user's image
      const senderEmail = session.user?.email || "";
      const recipientEmail = "admin@example.com"; // Replace with actual recipient email

      const fullFormData = {
        message,
        senderName,
        senderEmail,
        timeStamp: timestamp,
        recipientEmail,
        subject,
        adminPrivilege: false, // Set adminPrivilege to true for admin replies
        profilePicture, // Include profile picture
      };

      // Log the full form data
      console.log("Full Form Data:", fullFormData);

      await fetch("/api/inquiries/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullFormData),
      });

      setNotice("Submitted Successfully");

      // Reset form data and errors after successful submission
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

    // Clear the notice after 5 seconds
    setTimeout(() => setNotice(""), 5000);
  };

  // Move session check inside the return statement
  if (!session) {
    return <p>Please log in to submit a message.</p>;
  }

  return (
    <div className="">
      <div className="w-11/12 lg:w-8/12 bg-white m-auto lg:my-20 rounded-lg px-4 my-4">
        <div className="lg:w-1/2 m-auto py-10">
          <h1 className="text-lg font-bold mb-4 text-center">
            Get In Touch With Us
          </h1>
          <p className="text-sm text-gray-500 text-center">
            For More Information About Our Project. Please Feel Free To Drop an
            Email. Our Admin Will Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>
        <div className="flex flex-col md:flex-row w-11/12 m-auto">
          <div className="grid grid-cols-1 gap-8 md:w-1/2 mb-8">
            <div className="flex">
              <div className="mr-4">
                <Image
                  src={"/icons/location--dark.png"}
                  alt="Location icon"
                  className="w-6"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="font-bold text-sm">Address</p>
                <p className="text-sm">Camiling, Tarlac, Philippines</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <Image
                  src={"/icons/phone--dark.png"}
                  alt="Phone icon"
                  className="w-5"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="font-bold text-sm">Email</p>
                <p className="text-sm">carl@gmail.com</p>
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
  );
};

export default Contact;
