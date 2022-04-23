import React, { useState } from "react";
import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

export default function HeaderHome() {
  const [navbarOpen, setnavbarOpen] = useState(false);

  return (
    <>
      <header className="fixed z-50 top-0 w-full flex justify-between items-center bg-white shadow-lg px-4  m-auto  h-24 bg-primary md:px-28 overflow-scroll">
        <div className="">
          <h1 className="text-2xl font-extrabold text-orange-400">
            <Link href="/">
              <>
                DE<span className="text-indigo-600">MO</span>
              </>
            </Link>
          </h1>
        </div>

        <nav>
          <button
            className="md:hidden"
            onClick={() => setnavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-9 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul
            onClick={() => setnavbarOpen(!navbarOpen)}
            className={`fixed left-0 top-24 md:top-0 bg-gray-900 md:bg-transparent right-0 min-h-screen overflow-scroll bg-primary text-white font-light pt-10 text-4xl md:text-base space-y-8 p-4 transition duration-200 transform ${
              navbarOpen ? "translate-x-0" : "translate-x-full"
            } md:relative md:flex md:min-h-0 md:space-y-0 md:space-x-6 md:p-0 md:translate-x-0 md:text-slate-800`}
          >
            <div className="md:flex flex-row gap-5 md:w-full">
              <div className="flex flex-col md:flex gap-5 md:flex-row md:gap-10 md:mt-4">
                {/* <li>
                  <Link href="/">Home</Link>
                </li> */}

                {/* <li>
                  <Link href="/bal">About</Link>
                </li> */}
              </div>
              <div className="md:ml-60 md:flex md:flex-row">
                <Link href="/Logout">
                  <button
                    className=" bg-primarycolor md:bg-slate-800 md:ml-10 px-2 mt-4 md:mt-0 text-white py-3 md:px-10 flex justify-center gap-4"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    <span>Logout</span>
                  </button>
                </Link>
              </div>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}
