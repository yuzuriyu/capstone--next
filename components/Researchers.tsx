import { sayHello } from "@/lib/actions";
import React from "react";

const Researchers = async () => {
  "use server";
  return (
    <>
      <div className="w-11/12 m-auto lg:w-2/3 text-center">
        <h1 className="text-2xl text-center my-4">About Us</h1>
        <p className=" text-sm mb-10">
          We are the team behind the project—a group of BSIT students committed
          to developing a Footsstep Power Generator using Arduino technology for
          our capstone endeavor.
        </p>
      </div>
      <div className="w-11/12 md:w-9/12 m-auto grid grid-cols-2 gap-4 h-[550px] my-10">
        <div className="grid grid-cols-2 gap-4">
          <div className=" overflow-hidden relative group col-span-2">
            <img
              src="https://i.pinimg.com/564x/53/ee/f5/53eef591108919afa8880e91c9eda0cc.jpg"
              alt=""
              className="h-full w-full object-cover absolute "
            />
          </div>
          <div className=" overflow-hidden relative group col-span-2 ">
            <img
              src="https://i.pinimg.com/564x/20/96/3f/20963f4566e7e7915002e4a7804831a0.jpg"
              alt=""
              className="h-full w-full object-cover absolute "
            />
          </div>
        </div>
        <div className=" overflow-hidden relative group">
          <img
            src="https://i.pinimg.com/564x/ff/24/0c/ff240c08a12b973257d9bd57ed91db5b.jpg"
            alt=""
            className="h-full w-full object-cover absolute "
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className=" overflow-hidden relative group">
            <img
              src="https://i.pinimg.com/564x/a8/50/9e/a8509e24cb8f38fc5a2f9f9b7c06c11f.jpg"
              alt=""
              className="h-full w-full object-cover absolute "
            />
          </div>
          <div className=" overflow-hidden relative group">
            <img
              src="https://i.pinimg.com/564x/21/0a/8a/210a8ad1ba131cc1540978cb00073da6.jpg"
              alt=""
              className="h-full w-full object-cover absolute "
            />
          </div>
          <div className=" overflow-hidden relative group">
            <img
              src="https://i.pinimg.com/564x/0c/0e/33/0c0e331cbf8bba314af2da0a807c7e9c.jpg"
              alt=""
              className="h-full w-full object-cover absolute "
            />
          </div>
          <div className=" overflow-hidden relative group row-start-2 col-start-1 col-end-4">
            <img
              src="https://i.pinimg.com/564x/8d/20/d5/8d20d5d0985ffd15f674078e0f7d0bb7.jpg"
              alt=""
              className="h-full w-full object-cover absolute "
            />
          </div>
        </div>

        <div className=" overflow-hidden relative group">
          <img
            src="https://i.pinimg.com/564x/08/f6/c9/08f6c9711b8de932eaad90cf57fb03ab.jpg"
            alt=""
            className="h-full w-full object-cover absolute "
          />
        </div>
      </div>
    </>
  );
};

export default Researchers;
