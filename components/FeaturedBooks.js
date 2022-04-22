import React from "react";
import bookframe from "../assets/bookframe.svg";
import Image from "next/image";
import products from "../data/products";
import { useRouter } from "next/router";

export default function FeaturedBooks() {
  const router = useRouter();
  return (
    <section className="mt-48">
      <h2 className="text-4xl text-center">Featured Books</h2>
      <div className="flex flex-wrap justify-center gap-20 mt-28">
        <div
          className="w-full lg:w-80 px-2 py-2 bg-zinc-50"
          key={products[0].id}
          onClick={() => router.push(`/products/${products[0].id}`)}
        >
          <div>
            <Image src={products[0].image} alt="" />
          </div>
          <div className="mt-5">
            <p className="text-xl">{products[0].name}</p>
            <button className="py-3 px-10 text-sm bg-blue-100 text-slate-600 mt-5 w-full">
              View
            </button>
          </div>
        </div>

        <div
          className="w-full lg:w-80 px-2 py-2 bg-zinc-50"
          key={products[1].id}
          onClick={() => router.push(`/products/${products[1].id}`)}
        >
          <div>
            <Image src={products[1].image} alt="" />
          </div>
          <div className="mt-5">
            <p className="text-xl">{products[1].name}</p>
            <button className="py-3 px-10 text-sm bg-blue-100 text-slate-600 mt-5 w-full">
              View
            </button>
          </div>
        </div>
        <div
          className="w-full lg:w-80 px-2 py-2 bg-zinc-50"
          key={products[2].id}
          onClick={() => router.push(`/products/${products[2].id}`)}
        >
          <div>
            <Image src={products[2].image} alt="" />
          </div>
          <div className="mt-5">
            <p className="text-xl">{products[2].name}</p>
            <button className="py-3 px-10 text-sm bg-blue-100 text-slate-600 mt-5 w-full">
              View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
