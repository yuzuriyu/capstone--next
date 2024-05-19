"use client";
import React, { useState } from "react";

import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const submitForm = async () => {
    try {
      // Checking if any of the fields are empty
      if (!formData.name || !formData.email || !formData.message) {
        setNotice("Please fill in all required fields.");
        setErrors({
          name: !formData.name,
          email: !formData.email,
          subject: false,
          message: !formData.message,
        });
        return;
      }

      await fetch("https://next-structure-chi.vercel.app/api/inquiries/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      setNotice("Submitted Successfully");
      // Reset form data and errors after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="py-16">
      <div className="relative h-[316px]">
        <Image
          src={"/images/autumn.jpg"}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-playfair text-white">Contact</h1>
        </div>
      </div>
      <div className="w-11/12 m-auto py-10">
        <div className="lg:w-1/2 m-auto py-10">
          <h1 className="text-3xl font-bold mb-4 text-center ">
            Get In Touch With Us
          </h1>
          <p className="text-sm text-gray-500 text-center ">
            For More Information About Our Project. Please Feel Free To Drop Us
            An Email. Our Team Will Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>
        <div className="flex flex-col md:flex-row py-20 md:w-10/12 m-auto gap-20">
          <div className="grid grid-cols-1 gap-8 md:w-1/2 h-[250px]">
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
                <p className="font-bold ">Address</p>
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
                <p className="font-bold ">Email</p>
                <p className="text-sm ">biz.ccole@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:w-1/2">
            <p className="text-sm mb-2 ">Your Name</p>
            <input
              type="text"
              placeholder="Abc"
              className={`border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm ${
                errors.name ? "border-red-500" : ""
              }`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <p className="text-sm mb-2 ">Email address</p>
            <input
              type="text"
              placeholder="Abc@gmail.com"
              className={`border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm ${
                errors.email ? "border-red-500" : ""
              }`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <p className="text-sm mb-2 ">Subject</p>
            <input
              type="text"
              placeholder="This is optional"
              className="border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
            <p className="text-sm mb-2 ">Message</p>
            <textarea
              placeholder="Hi! I'd like to ask about"
              className={`border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm ${
                errors.message ? "border-red-500" : ""
              }`}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
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
