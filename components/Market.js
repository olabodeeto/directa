import React from "react";
import Image from "next/image";
import img1 from "../assets/1.jpg";
import products from "../data/products";
import { useRouter } from "next/router";

export default function Market() {
  const router = useRouter();
  const handleAddtoCart = (prod) => {
    console.log(prod);
  };
  const booklist = products.map((book) => (
    <div
      className="p-2 bg-white cursor-pointer hover:bg-zinc-200 hover:rounded-xl site-transition"
      key={book.id}
      onClick={() => router.push(`/products/${book.id}`)}
    >
      <div className="bg-zinc-50 w-80 h-80 flex flex-col justify-center items-center">
        <Image src={book.image} className="object-cover" />
        <div className="px-2 flex justify-center items-center mt-3">
          <p className="font-bold">{book.name}</p>
        </div>
      </div>
      <div className="px-2 py-4 flex justify-between items-center">
        <p className="">${book.price}.00</p>
        <div
          className="py-2 px-10 bg-slate-800 text-white"
          onClick={() => router.push(`/products/${book.id}`)}
        >
          Buy
        </div>
      </div>
    </div>
  ));

  return (
    <section className="mt-40 w-full m-auto ">
      <h1 className="text-4xl text-center text-slate-700 font-bold">
        Our Store
      </h1>
      <div className=" mt-20 from-primarycolor bg-gradient-to-r to-indigo-200 py-20 lg:px-10 rounded-2xl">
        <div className="flex flex-wrap gap-2 justify-between">{booklist}</div>
      </div>
    </section>
  );
}
