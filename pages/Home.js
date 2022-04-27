import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import HeaderHome from "../components/HeaderHome";
import currencyFormatter from "currency-formatter";
import { Constants } from "../Constants";
import { data } from "autoprefixer";
import PaymentClass from "../classes/paymentClass";
import { useRouter } from "next/router";

export default function Home({
  email,
  name,
  balance,
  planActive,
  plan,
  savingsAmount,
  memberID,
}) {
  const [bal, setbal] = useState(0);
  const [pendingAmount, setpendingAmount] = useState(0);
  const [bankBtnStatus, setbankBtnStatus] = useState(" Use Bank Account");
  const router = useRouter();

  console.log(planActive);
  console.log(memberID);

  async function handlePaywithBank() {
    setbankBtnStatus("Processing...");
    const paymentMethod = new PaymentClass();
    let mono_RC = (0.5 / 100) * savingsAmount * 100;
    let amount = savingsAmount * 100 + mono_RC;

    let res = await paymentMethod.monoPayment(amount, memberID + Date.now());
    if (res.payment_link) {
      console.log(res);
      window.location.href = res.payment_link;
    }
  }

  async function createPendingTransaction(pendingdata) {
    const payment = new PaymentClass();
    const res = await payment.pendingpay(pendingdata);
    console.log(res);
  }

  async function checkPending(memberID) {
    const payment = new PaymentClass();
    const res = await payment.checkPending(memberID);
    if (res.data) {
      try {
        setpendingAmount(parseInt(res.data[0].amount));
      } catch (error) {}
    }
  }

  async function currentBalance(memberID) {
    const payment = new PaymentClass();
    const res = await payment.currentBalance(memberID);
    if (res) {
      try {
        setbal(res);
      } catch (error) {}
    }
  }

  useEffect(() => {
    if (router.query.reference && router.query.status != "failed") {
      const prendingTransaction = {
        memberID: memberID,
        amount: savingsAmount,
        reference: router.query.reference,
      };

      createPendingTransaction(prendingTransaction);
    }

    checkPending({ memberID: memberID });

    currentBalance({ memberID: memberID });
  }, []);

  return (
    <>
      <HeaderHome />
      <main className="bg-indigo-50 h-full py-16 pb-40 mt-12">
        <div className=" w-11/12 lg:w-5/12 m-auto bg-white">
          <div className="bg-slate-800 px-4 py-16 rounded-md">
            <p className="text-white text-center font-extrabold text-5xl">
              {currencyFormatter.format(bal, {
                code: "NGN",
              })}
            </p>
            <div className="pt-10 flex gap-10 justify-center">
              {pendingAmount ? (
                <>
                  <p className="text-white">Pending transaction</p>
                  <p className="text-yellow-400">
                    {currencyFormatter.format(pendingAmount, {
                      code: "NGN",
                    })}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
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
                    <button
                      className="py-3 px-10 bg-indigo-500 text-white mt-4"
                      onClick={handlePaywithBank}
                    >
                      {bankBtnStatus}
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
        memberID: session.id,
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
