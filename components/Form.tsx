"use client";
import React, { useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { format } from "date-fns"; // Import format function from date-fns

const Contact = () => {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  const getCurrentTimestamp = () => {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  };

  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState({
    subject: false,
    message: false,
  });

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

      const timestamp = getCurrentTimestamp();
      const senderName = session?.user?.username; // Use session user's name
      const profilePicture = session?.user?.profilePicture; // Use session user's image
      const senderEmail = session?.user?.email;
      const recipientEmail = "admin";

      console.log("Sender Name:", senderName);
      console.log("Sender Email:", senderEmail);
      console.log("Recipient Email:", recipientEmail);
      console.log("Subject:", subject);
      console.log("Message:", message);
      console.log("Timestamp:", timestamp);
      console.log("Profile Picture:", profilePicture);

      console.log("Timestamp:", timestamp);
      console.log("Profile Picture:", profilePicture);

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

      await fetch("api/inquiries/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullFormData),
      });

      setNotice("Submitted Successfully");

      // Reset form data and errors after successful submission
      setMessage("");
      setErrors({
        subject: false,
        message: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="">
      <div className="w-11/12 lg:w-8/12 bg-white m-auto  lg:my-20 rounded-lg px-4 my-4">
        <div className="lg:w-1/2 m-auto py-10">
          <h1 className="text-lg font-bold mb-4 text-center ">
            Get In Touch With Us
          </h1>
          <p className="text-sm text-gray-500 text-center ">
            For More Information About Our Project. Please Feel Free To Drop Us
            An Email. Our Team Will Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>
        <div className="flex flex-col md:flex-row  w-11/12 m-auto">
          <div className="grid grid-cols-1 gap-8 md:w-1/2 mb-8">
            <div className="flex">
              <div className="mr-4">
                <Image
                  src={"/icons/location--dark.png"}
                  alt=""
                  className="w-6"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="font-bold text-sm">Address</p>
                <p className="text-sm ">Camiling, Tarlac, Philippines</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <Image
                  src={"/icons/phone--dark.png"}
                  alt=""
                  className="w-5"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="font-bold text-sm">Email</p>
                <p className="text-sm ">biz.ccole@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:w-1/2">
            <p className="text-sm mb-2 ">Subject</p>
            <input
              type="text"
              placeholder="This is optional"
              className="border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <p className="text-sm mb-2 ">Message</p>
            <textarea
              placeholder="Hi! I'd like to ask about"
              className={`border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm ${
                errors.message ? "border-red-500" : ""
              }`}
              value={message} // Change this from 'subject' to 'message'
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="bg-orange-400 text-white px-7 py-3 mt-4 rounded-lg w-[200px] mr-4 mb-4"
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
