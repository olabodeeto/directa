import React from "react";
import useravatar from "../assets/useravatar.svg";
import Image from "next/image";
import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";

export default function OurTeam() {
  return (
    <section className="mt-48  p-5 lg:p-5 rounded-3xl">
      <div className=" p-8 rounded-3xl">
        <h2 className="text-4xl text-center text-slate-800 mb-28">Our Team</h2>
        <div className="flex flex-wrap justify-evenly mb-10">

        <div className="w-full lg:w-4/12 px-5 lg:mt-10 py-2 mb-20 lg:mb-0">
            <div className="p-2 bg-teamimgagebg rounded-full ">
              <Image src={member2} alt="" className="rounded-full" />
            </div>
            <div className="mt-4">
              <p className="text-md text-center w-6/12 m-auto">
                Rev. Michael Olusegun Bamigboye.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-4/12 px-5 lg:mt-10 py-2 mb-20 lg:mb-0">
            <div className="p-2 bg-teamimgagebg rounded-full ">
              <Image src={member3} alt="" className="rounded-full" />
            </div>
            <div className="mt-4">
              <p className="text-md text-center w-6/12 m-auto">
                Pastor Stephen Olaniran Oluwalana.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-4/12 px-5 lg:mt-10 py-2 mb-20 lg:mb-0">
            <div className="p-2 bg-teamimgagebg rounded-full ">
              <Image src={member1} alt="" className="rounded-full" />
            </div>
            <div className="mt-4">
              <p className="text-md text-center w-6/12 m-auto">
                Mrs Olufunke Modupe Bamigboye.
              </p>
            </div>
          </div>

         

          <div className="w-full lg:w-4/12 px-5 lg:mt-10 py-2 mb-20 lg:mb-0">
            <div className="p-2 bg-teamimgagebg rounded-full ">
              <Image src={useravatar} alt="" className="rounded-full" />
            </div>
            <div className="mt-4">
              <p className="text-md text-center w-10/12 m-auto">
                Lorem ipsum dolor Lorem ipsum dolor
              </p>
            </div>
          </div>
        </div>

        {/* team profile end */}
      </div>
    </section>
  );
}
