import React from "react";
import Image from "next/image";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";

export default function LatestArt() {
  return (
    <section className="mt-40 w-full m-auto from-zinc-100 bg-gradient-to-r to-zinc-200 py-20 lg:px-10 rounded-2xl">
      <h1 className="text-4xl text-center text-primarycolor font-bold">
        Fresh NFT's
      </h1>
      <div className="border border-purple-500 py-10 mt-20">
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="p-2 bg-white">
            <div className="bg-indigo-400 w-80 h-80 flex flex-col justify-center items-center">
              <Image src={img1} className="object-cover" />
              <div className="px-2 flex justify-center items-center mt-3">
                <p className="font-bold">Walk in Nature</p>
              </div>
            </div>
            <div className="px-2 py-4 flex justify-between items-center">
              <p className="">2.00 ETH</p>
              <div className="py-2 px-10 bg-slate-800 text-white">Buy</div>
            </div>
          </div>
          <div className="p-2 bg-white">
            <div className="bg-orange-200 w-80 h-80 flex flex-col justify-center items-center">
              <Image src={img2} className="object-cover" />
              <div className="px-2 flex justify-center items-center mt-3">
                <p className="font-bold">Walk in Pieces</p>
              </div>
            </div>
            <div className="px-2 py-4 flex justify-between items-center">
              <p className="">2.00 ETH</p>
              <div className="py-2 px-10 bg-slate-800 text-white">Buy</div>
            </div>
          </div>
          <div className="p-2 bg-white">
            <div className="bg-cyan-400 w-80 h-80 flex flex-col justify-center items-center">
              <Image src={img3} className="object-cover" />
              <div className="px-2 flex justify-center items-center mt-3">
                <p className="font-bold">Walk in Nature</p>
              </div>
            </div>
            <div className="px-2 py-4 flex justify-between items-center">
              <p className="">2.00 ETH</p>
              <div className="py-2 px-10 bg-slate-800 text-white">Buy</div>
            </div>
          </div>

          <div className="p-2 bg-white">
            <div className="bg-cyan-400 w-80 h-80 flex flex-col justify-center items-center">
              <Image src={img3} className="object-cover" />
              <div className="px-2 flex justify-center items-center mt-3">
                <p className="font-bold">Walk in Nature</p>
              </div>
            </div>
            <div className="px-2 py-4 flex justify-between items-center">
              <p className="">2.00 ETH</p>
              <div className="py-2 px-10 bg-slate-800 text-white">Buy</div>
            </div>
          </div>
          <div className="p-2 bg-white">
            <div className="bg-cyan-400 w-80 h-80 flex flex-col justify-center items-center">
              <Image src={img1} className="object-cover" />
              <div className="px-2 flex justify-center items-center mt-3">
                <p className="font-bold">Walk in Nature</p>
              </div>
            </div>
            <div className="px-2 py-4 flex justify-between items-center">
              <p className="">2.00 ETH</p>
              <div className="py-2 px-10 bg-slate-800 text-white">Buy</div>
            </div>
          </div>
          <div className="p-2 bg-white">
            <div className="bg-cyan-400 w-80 h-80 flex flex-col justify-center items-center">
              <Image src={img3} className="object-cover" />
              <div className="px-2 flex justify-center items-center mt-3">
                <p className="font-bold">Walk in Nature</p>
              </div>
            </div>
            <div className="px-2 py-4 flex justify-between items-center">
              <p className="">2.00 ETH</p>
              <div className="py-2 px-10 bg-slate-800 text-white">Buy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
