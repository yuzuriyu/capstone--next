import React from "react";
import Sidebar from "@/components/Sidebar";
import Researchers from "@/components/Researchers";

const About = async () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Researchers />
      </div>
    </div>
  );
};

export default About;
