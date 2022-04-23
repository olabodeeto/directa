import Link from "next/link";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "../components/Header";
import UserClass from "../classes/userClass";
import Router from "next/router";

export default function Signup() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isFlex, setisFlex] = useState(false);
  const [plan, setplan] = useState({ planname: "Silver", savingAmount: 1000 });
  const [btnState, setbtnState] = useState("Proceed");

  const handleplans = (planSelected) => {
    if (planSelected === "Gold") {
      setisFlex(false);
      setplan({ planname: "Gold", savingAmount: 5000 });
    } else if (planSelected === "Silver") {
      setisFlex(false);
      setplan({ planname: "Gold", savingAmount: 1000 });
    } else if (planSelected === "Plantinum") {
      setisFlex(false);
      setplan({ planname: "Gold", savingAmount: 10000 });
    } else if (planSelected === "Flexy") {
      setisFlex(true);
    }
  };

  const handleFlexyPlan = (flexyAmount) => {
    setplan({ planname: "Flexy", savingAmount: flexyAmount });
  };

  const handleAccount = async (e) => {
    e.preventDefault();
    let data = { fullname, email, password, plan };
    setbtnState("Processing...");

    let newUser = new UserClass(
      fullname,
      email,
      plan.planname,
      plan.savingAmount,
      password
    );
    let res = await newUser.createAccount();
    console.log(res);
    if (res._id) {
      setbtnState("Success!");
      setTimeout(() => {
        Router.push("/Login");
      }, 3000);
    } else {
      setbtnState("Action failed!");
      setTimeout(() => {
        setbtnState("Proceed");
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-indigo-50 h-full pt-12 py-20">
        <div className="mt-28 w-11/12 lg:w-5/12 m-auto bg-white  px-6 py-10 overflow-scroll">
          <h1 className="text-2xl text-center">Create your demo account</h1>
          <div className="mt-14">
            <form onSubmit={handleAccount}>
              <div className="flex flex-col gap-2 mb-5">
                <label>Full Name </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                  required
                  placeholder="Name"
                  className="p-3 outline-none w-full bg-indigo-50 border border-indigo-200"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label>Email </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email"
                  className="p-3 outline-none w-full bg-indigo-50 border border-indigo-200"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  className="p-3 outline-none w-full bg-indigo-50 border border-indigo-200"
                />
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <label className="flex justify-between">
                  Select plan
                  <span className="text-orange-600 text-sm">
                    <Link href="/plans">(Learn more on our plans)</Link>
                  </span>
                </label>

                <select
                  className="p-3 outline-none w-full bg-indigo-50 border border-indigo-200"
                  onChange={(e) => handleplans(e.target.value)}
                >
                  <option defaultValue="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Plantinum">Plantinum</option>
                  <option value="Flexy">Flexy</option>
                </select>
              </div>

              {isFlex && (
                <div className="flex flex-col gap-2 mb-5">
                  <label>Input amount for flexy savings</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => handleFlexyPlan(e.target.value)}
                    placeholder="Amount"
                    className="p-3 outline-none w-full bg-indigo-50 border border-indigo-200"
                  />
                </div>
              )}
              <div>
                <button
                  className="py-3 px-10 bg-slate-800 text-white"
                  type="submit"
                >
                  {btnState}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: `/Home`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "",
    }, // will be passed to the page component as props
  };
}
