import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [password, setpassword] = useState("");
  const [btnState, setbtnState] = useState("Login");
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `/Home`,
    });
  };

  useEffect(() => {
    if (router.query.error) {
      setmessage("Invalid, login not successful"); // Shown below the input field in my example
    }
  }, [router]);

  return (
    <>
      <Header />
      <main className="bg-indigo-50 h-screen pt-12">
        <div className="mt-28 w-11/12 lg:w-5/12 m-auto bg-white  px-6 py-10 overflow-scroll">
          <h1 className="text-center text-2xl">Login</h1>
          <p className="py-5 text-center text-red-500"> {message}</p>
          <div className="mt-10">
            <form onSubmit={handleLogin}>
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
