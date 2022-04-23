import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import HeaderHome from "../components/HeaderHome";
import currencyFormatter from "currency-formatter";
import { Constants } from "../Constants";
import { data } from "autoprefixer";

export default function Home({ email, name, balance, planActive, plan }) {
  const [bal, setbal] = useState(0);
  console.log(planActive);

  // async function getBalance() {
  //   const res = await fetch(`${Constants.baseUrl}\currentBalance`);
  //   const data = await res.json();
  //   setbal(data.balance);
  // }
  useEffect(() => {
    // getBalance();
    if (email) {
      console.log(email, name);
    }
  }, []);

  return (
    <>
      <HeaderHome />
      <main className="bg-indigo-50 h-screen pt-12">
        <div className="mt-28 w-11/12 lg:w-5/12 m-auto bg-white">
          <div className="bg-slate-800 px-4 py-16 rounded-md">
            <p className="text-white text-center font-extrabold text-5xl">
              {currencyFormatter.format(balance, {
                code: "NGN",
              })}
            </p>
          </div>
          <div className="mt-10">
            <p className="text-2xl">Name: {name}</p>
            <div className="mt-10">
              <p className="text-2xl">Plan: {plan}</p>
              {planActive ? (
                ""
              ) : (
                <button className="py-3 px-10 bg-orange-500 text-white">
                  Activate your plan
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/Login`,
        permanent: false,
      },
    };
  }
  if (session) {
    return {
      props: {
        email: session.email,
        name: session.name,
        balance: session.balance,
        plan: session.plan,
        planActive: session.planActive,
      }, // will be passed to the page component as props
    };
  }
}
