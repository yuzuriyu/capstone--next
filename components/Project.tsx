"use client";
import React, { useState } from "react";
import Image from "next/image";
const Details = () => {
  const [showAll, setShowAll] = useState(false);
  const [showSpecification, setShowSpecification] = useState(false);

  const toggleSpecification = () => {
    setShowSpecification((prevStatus) => !prevStatus);
  };

  return (
    <div className="py-16">
      <div className="relative h-[316px] w-full">
        <Image
          src={"/images/spring.jpg"}
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-playfair ">Details</h1>
        </div>
      </div>
      <div className="w-11/12 m-auto py-20 md:w-10/12">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h1 className="text-xl font-bold mb-4  border-b">
              Project Overview
            </h1>
            <p className="text-sm">
              This is a capstone project about Footstep Power Generator with
              Arduino which captures energy from footfalls to generate
              electricity. Using sensors and an Arduino microcontroller, it
              converts mechanical energy into electrical energy efficiently.
            </p>
          </div>
          <div>
            <h1 className="text-xl border-b font-bold mb-4 ">
              Components Used:
            </h1>
            {showSpecification ? (
              <div>
                <li className="text-sm mb-2">R3 ATmega328p</li>
                <li className="text-sm mb-2">3.7V 4500mAh</li>
                <li className="text-sm mb-2">Type C Micro USB 5V</li>
                <li className="text-sm mb-2">NodeMCU V3 ESP8266h</li>
                <li className="text-sm mb-2">10 pcs. 35mm Buzzer Sensor</li>

                {showAll && (
                  <>
                    <li className="text-sm mb-2">1.3” 128x64px 3.3- 5V DC</li>
                    <li className="text-sm mb-2">LiPo Fuel Gauge MAX1704</li>
                    <li className="text-sm mb-2">830 Tie Points Full</li>
                    <li className="text-sm mb-2">20cm M-M</li>
                    <li className="text-sm mb-2">1/4W Metal Film</li>
                  </>
                )}
              </div>
            ) : (
              <>
                <li className="text-sm mb-2">Arduino Uno</li>
                <li className="text-sm mb-2">Lithium-ion Battery</li>
                <li className="text-sm mb-2">Battery Charger Module</li>
                <li className="text-sm mb-2">Wifi Module</li>
                <li className="text-sm mb-2">Piezoelectric Sensor</li>
                {showAll && (
                  <>
                    <li className="text-sm mb-2">LCD Display</li>
                    <li className="text-sm mb-2">
                      Power Detection Alarm Module
                    </li>
                    <li className="text-sm mb-2">Bread Board</li>
                    <li className="text-sm mb-2">Jump Wire</li>
                    <li className="text-sm mb-2">Resistor</li>
                  </>
                )}
              </>
            )}
            <div className="flex justify-between">
              <p
                className="text-xs text-blue-400 cursor-pointer mt-4 "
                onClick={() => setShowAll((prevStatus) => !prevStatus)}
              >
                {showAll ? "See Less" : "See More"}
              </p>
              <p
                className="text-xs text-blue-400 cursor-pointer mt-4"
                onClick={() => toggleSpecification()}
              >
                {showSpecification ? "Show Components" : "Show Specification"}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-4 border-b ">
              Project Objectives:
            </h1>
            <li className="text-sm mb-2">
              Demonstrating the feasibility of harvesting energy from human
              footsteps.
            </li>
            <li className="text-sm mb-2">
              Exploring renewable energy sources for low-power applications.
            </li>
            <li className="text-sm">
              Promoting sustainable and eco-friendly technologies.
            </li>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-4 border-b ">Challenges</h1>
            <li className="text-sm mb-2">
              Sensor calibration and sensitivity adjustment for accurate
              readings.
            </li>

            <li className="text-sm mb-2">
              Ensuring robustness and durability of components in varying
              environmental conditions.
            </li>
            <li className="text-sm mb-2">
              Designing efficient power transmission mechanisms for energy
              harvesting systems.
            </li>
            <li className="text-sm">
              Power management optimization to maximize energy efficiency.
            </li>
          </div>

          <div>
            <h1 className="text-xl font-bold mb-4 border-b ">Conclusion</h1>
            <p className="text-sm">
              The Footstep Power Generator project represents a significant step
              towards harnessing renewable energy from everyday human
              activities. By utilizing innovative technologies and sustainable
              design principles, we aim to contribute to the global efforts
              towards environmental conservation and energy sustainability.
            </p>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-4 border-b ">
              Future Enhancements:
            </h1>
            <li className="text-sm mb-2">
              Increasing power output efficiency through advanced sensor
              technologies.
            </li>

            <li className="text-sm">
              Scaling up the system for larger applications, such as public
              spaces and commercial buildings.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
