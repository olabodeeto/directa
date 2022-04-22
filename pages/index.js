import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import react from "react";
import { Constants } from "../Constants";
import Header from "../components/Header";
import hand from "../assets/hand.svg";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    fetch(`${Constants.baseUrl}/hello`).then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    });
  }, []);

  return (
    <>
      <Header />
      <main className="bg-indigo-50 h-screen pt-12">
        <div className=" w-full m-auto h-full gap-4 flex flex-col lg:flex-row ">
          <div className=" py-10 lg:pl-28 lg:mt-28 w-full lg:w-6/12">
            <h1 className=" text-4xl text-center lg:text-left lg:text-6xl lg:w-10/12 mt-20">
              Straight-forward way of financial
            </h1>

            <div className="mt-10 flex justify-center lg:justify-start">
              <Link href="/Signup">
                <button className="py-3 px-10 bg-slate-800 text-white">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block py-10 w-full lg:w-6/12">
            <div className="flex justify-end">
              <div className="w-auto h-96">
                <Image src={hand} alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
