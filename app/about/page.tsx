import Image from "next/image";
import Header from "@/components/Header";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import MobileNav from "@/components/MobileNav";

export default async function About() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Unable to load session. Please try again later.</p>;
  }

  return (
    <>
      <Header session={session} />
      <div className="relative w-full md:h-[500px] h-screen">
        <Image
          src={"/images/walk.jpg"}
          alt="Cover Photo"
          className="w-full h-full object-cover brightness-75"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 w-7/12 ">
          <p className="text-5xl mb-2 font-playfair text-white ">
            Turning Every Footstep <br /> into a Force <br /> for Positive
            Change
          </p>
        </div>
      </div>
      <div className="bg-white">
        <div className=" my-4 py-4 px-4 w-11/12 lg:w-8/12 m-auto  bg-white rounded-lg">
          <p className="leading-9 text-justify">
            Our journey began as a capstone project fueled by a vision to turn
            everyday movement into sustainable energy. As passionate students of
            innovation and sustainability, we sought to create a real-world
            solution that goes beyond academia. The footstep power generator
            embodies our commitment to reimagining energy use in daily life,
            transforming each step into a force for positive change. By
            integrating renewable energy into public spaces, we aim to show that
            even small actions, like walking, can contribute to a greener
            future. This project is our way of merging technical skills with our
            drive to make a lasting impact on the environment.
          </p>
        </div>
      </div>

      <MobileNav session={session} />
    </>
  );
}
