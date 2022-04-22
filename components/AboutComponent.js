import React from "react";
import Image from "next/image";
import bibleimg from "../assets/bible.svg";
import Link from "next/link";

export default function AboutComponent() {
  return (
    <>
      <section className="mt-40 py-10">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-6/12 flex justify-center lg:justify-start">
            <div className="aboutimg">
              <Image src={bibleimg} alt="" className="object-cover" />
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <h1 className="text-6xl text-center lg:text-left text-slate-800">
              About Us
            </h1>
            <div className="mt-10">
              <p className="p-2 text-slate-600 leading-8 text-justify">
                Eternal and Full Grace Christian League is an
                interdenominational body formed in year 2018 for the edification
                of the body of Christ and the spiritual growth of Christians all
                over the world. The vision and Mission of this body were born
                out of a revelation which God granted to Rev. Michael Olusegun
                Bamigboye in June 2000 when he was a Church junior Pastor in
                Ibadan.
                <span className="text-primarycolor ml-4">
                  <Link href="/about">Read more</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
