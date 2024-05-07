import Steps from "@/components/Steps";
import Sidebar from "@/components/Sidebar";
import Subheader from "@/components/Subheader";

const Guide = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Steps />
      </div>
    </div>
  );
};

export default Guide;
