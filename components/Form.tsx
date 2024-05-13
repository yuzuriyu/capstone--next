"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { InquiriesType } from "@/app/interfaces";

const Form = () => {
  const [formData, setFormData] = useState<InquiriesType>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = async () => {
    try {
      await fetch("https://next-structure-chi.vercel.app/api/inquiries/new", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      alert("submission complete");
    } catch (err) {
      alert("submission failed");
      console.log(err);
    }
  };
  console.log(formData);

  return (
    <>
      <div className="relative h-[316px]">
        <Image
          src="/images/autumn.jpg"
          alt=""
          className="w-full h-full object-cover object-bottom"
          width={0}
          height={0}
          sizes="100vw"
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
                  src="/icons/location--dark.png"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p className="font-bold ">Address</p>
                <p className="text-sm ">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <Image
                  src="/icons/phone--dark.png"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p className="font-bold ">Phone</p>
                <p className="text-sm ">Mobile: +(84) 546-6789</p>
                <p className="text-sm ">Hotline: +(84) 456-6789</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <Image
                  src="/icons/time--dark.png"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p className="font-bold dark:text-white">Working Time</p>
                <p className="text-sm ">Monday-Friday: 9:00 - 22:00</p>
                <p className="text-sm ">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:w-1/2">
            <p className="text-sm mb-2 ">Your Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Abc"
              className="border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm"
              onChange={handleChange}
            />
            <p className="text-sm mb-2 ">Email address</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Abc@gmail.com"
              className="border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm"
              onChange={handleChange}
            />
            <p className="text-sm mb-2 ">Subject</p>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              placeholder="This is optional"
              className="border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm"
              onChange={handleChange}
            />
            <p className="text-sm mb-2 ">Message</p>
            <textarea
              placeholder="Hi! I'd like to ask about"
              className="border rounded-lg px-4 py-4 mb-4 flex-1 placeholder:text-sm"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <button
              className="bg-orange-400 text-white px-7 py-3 mt-4 rounded-lg w-[200px]"
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
