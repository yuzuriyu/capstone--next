import Sidebar from "@/components/Sidebar";
import Subheader from "@/components/Subheader";
import Form from "@/components/Form";

const Contact = async () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Subheader />
        <Form />
      </div>
    </div>
  );
};

export default Contact;
