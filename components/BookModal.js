import React from "react";

export default function BookModal({ status, mssg }) {
  return (
    <div
      className={`status w-full h-full overflow-scroll bg-black opacity-90 px-2 lg:px-10 fixed z-40 top-0`}
    >
      <div className="w-10/12 lg:w-5/12 m-auto py-12 bg-white mt-40 px-10 rounded-lg">
        <p>{mssg}</p>
      </div>
    </div>
  );
}
