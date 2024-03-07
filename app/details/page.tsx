import Project from "@/components/Project";
import Sidebar from "@/components/Sidebar";
import Subheader from "@/components/Subheader";

const Details = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Subheader />
        <Project />
      </div>
    </div>
  );
};

export default Details;
