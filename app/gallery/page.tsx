import Documentation from "@/components/Documentation";
import Sidebar from "@/components/Sidebar";
import Subheader from "@/components/Subheader";

const Gallery = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Subheader />
        <Documentation />
      </div>
    </div>
  );
};

export default Gallery;
