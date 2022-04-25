import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import HeaderHome from "../components/HeaderHome";
import currencyFormatter from "currency-formatter";
import { Constants } from "../Constants";
import { data } from "autoprefixer";

export default function Home({
  email,
  name,
  balance,
  planActive,
  plan,
  savingsAmount,
}) {
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
      <main className="bg-indigo-50 h-full py-16 pb-40 mt-12">
        <div className=" w-11/12 lg:w-5/12 m-auto bg-white">
          <div className="bg-slate-800 px-4 py-16 rounded-md">
            <p className="text-white text-center font-extrabold text-5xl">
              {currencyFormatter.format(balance, {
                code: "NGN",
              })}
            </p>
          </div>
          <div className="mt-10 px-4 py-10">
            <p className="text-2xl">Name: {name}</p>
            <div className="mt-10">
              <div className="text-xl flex justify-between mb-5 bg-zinc-100 p-2">
                <span>
                  <b>Plan:</b>
                </span>
                <span>{plan}</span>
              </div>
              <div className="text-xl flex justify-between bg-zinc-100 p-2">
                <b>SPW:</b>
                <span>
                  {currencyFormatter.format(savingsAmount, {
                    code: "NGN",
                  })}
                </span>
              </div>
              {planActive ? (
                ""
              ) : (
                <div className="mt-10 mb-12">
                  <p className="text-center"> Activate your plan </p>
                  <div className="mt-12 flex justify-center gap-2">
                    <button className="py-3 px-10 bg-indigo-500 text-white mt-4">
                      Use Bank Account
                    </button>
                    <button className="py-3 px-10 bg-indigo-600 text-white mt-4">
                      Use Debit Card
                    </button>
                  </div>
                </div>
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
        savingsAmount: session.savingsAmount,
      }, // will be passed to the page component as props
    };
  }
}
