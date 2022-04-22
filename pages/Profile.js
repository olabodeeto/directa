import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Constants } from "../Constants";

export default function Profile() {
  const [bal, setbal] = useState(0);

  async function getBalance() {
    const res = await fetch(`${Constants.baseUrl}\currentBalance`);
    const data = await res.json();
    setbal(data.balance);
  }
  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-indigo-50 h-screen pt-12">
        <div className="mt-28 w-11/12 lg:w-5/12 m-auto bg-white">
          <div className="bg-indigo-400 px-4 py-16 rounded-md">
            <p className="text-white text-center font-extrabold text-5xl">
              NGN {bal}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
