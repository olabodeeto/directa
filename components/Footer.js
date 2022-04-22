import Link from "next/link";
import React from "react";
import Image from "next/image";
import facebookicon from "../assets/facebookicon.svg";

export default function Footer() {
  return (
    <footer className="mt-28 bg-footercolor">
      <div className="py-28 lg:px-24 bg-footerTopColor flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-4/12">
          <h2 className="text-2xl text-footerText">FGCL</h2>
          <div className="text-footerText flex flex-col gap-2 mt-8">
            <p>Info@fcgl.org</p>
            <p>+234 9053 722 063</p>
            <p className="w-full lg:w-8/12">18, Ashamo Layout, Oba Ile, Akure North,
Ondo State.</p>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-20 lg:mt-0 flex flex-col lg:items-center">
          <div>
            <h2 className="text-2xl text-footerText">Quick Links</h2>
            <div className="text-footerText flex flex-col gap-2 mt-8">
              <Link href="/">Home</Link>
              <Link href="/">About us</Link>
              <Link href="/">Contact us</Link>
              <Link href="/">Store</Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 flex flex-col mt-10 lg:mt-0 items-start lg:items-end">
          <Image src={facebookicon} alt="" />
        </div>
      </div>
      <div className="text-center py-5 text-slate-400 text-sm">
        &copy; Copyright FGCL. All rights reserved
      </div>
    </footer>
  );
}
