"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Image1 from "../public/images/img-1.jpg";
import Image2 from "../public/images/img-2.jpg";
import Image3 from "../public/images/img-3.jpg";
import Image5 from "../public/images/img-5.jpg";
import Image7 from "../public/images/img-7.jpg";
import Image6 from "../public/images/img-1.jpg";
import Image8 from "../public/images/img-8.jpg";
import Image9 from "../public/images/img-9.jpg";

import Image from "next/image";

const Documentation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const images = [
    Image1,
    Image2,
    Image3,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
  ];

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = images.slice(indexOfFirstItem, indexOfLastItem);

  const openModal = (image: any) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="py-16">
      <div className="relative h-[316px] w-full">
        <Image
          src={"/images/sunny.jpg"}
          width={0}
          height={0}
          sizes="100vw"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-playfair text-white">Gallery</h1>
        </div>
      </div>

      <div className="w-11/12 m-auto py-16 md:w-10/12 grid grid-cols-2 md:grid-cols-3 gap-4">
        {currentImages.map((image, index) => (
          <div key={index} className="h-[250px] relative overflow-hidden">
            <Image
              src={image}
              alt=""
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openModal(image)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {images.length > itemsPerPage && (
          <ul className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(images.length / itemsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    className={`px-3 py-1 rounded-full ${
                      currentPage === i + 1
                        ? "bg-customblue text-white"
                        : "bg-bggray text-gray-800"
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
      {modalOpen && (
        <Modal selectedImage={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Documentation;
