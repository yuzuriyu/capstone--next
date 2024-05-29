import Sidebar from "@/components/Sidebar";
import Guidebook from "@/components/Guidebook";

const Guide = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Guidebook />
      </div>
    </div>
  );
};

export default Guide;
