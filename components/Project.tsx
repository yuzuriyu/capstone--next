"use client";

import React, { useState } from "react";
import Image from "next/image";

const Project = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="relative h-[316px] w-full">
        <Image
          src="/images/spring.jpg"
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-playfair ">Project</h1>
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
            <li className="text-sm mb-2">Arduino microcontroller board</li>
            <li className="text-sm mb-2">Piezoelectric sensors</li>
            <li className="text-sm mb-2">Voltage regulator</li>
            <li className="text-sm mb-2">Capacitors</li>
            {showAll && (
              <div>
                <li className="text-sm mb-2">Resistors</li>
                <li className="text-sm mb-2">LED indicators</li>
                <li className="text-sm mb-2">
                  Breadboard or PCB for circuit prototyping
                </li>
                <li className="text-sm mb-2">Wires and connectors</li>
              </div>
            )}
            <p
              className="text-xs text-blue-400 cursor-pointer mt-4 "
              onClick={() => setShowAll((prevStatus) => !prevStatus)}
            >
              See more
            </p>
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
            <h1 className="text-xl font-bold mb-4 border-b ">
              Challenges and Solutions:
            </h1>
            <li className="text-sm mb-2">
              Sensor calibration and sensitivity adjustment for accurate
              readings.
            </li>
            <li className="text-sm mb-2">
              Noise reduction techniques to improve signal quality.
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
            <li className="text-sm mb-2">
              Integrating with IoT platforms for remote monitoring and control.
            </li>
            <li className="text-sm">
              Scaling up the system for larger applications, such as public
              spaces and commercial buildings.
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
