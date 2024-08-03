import React from "react";
import BSK from "../assets/BSK.svg";
import search from "../assets/search.svg";

export default function Navbar() {
  return (
    <>
      <div className="mb-20 ">
        <nav className="bg-white fixed w-full z-20 top-0 start-0 ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="hidden md:flex space-x-5">
                <h1 className="text-2xl font-graphik">HOME</h1>
                <h1 className="text-2xl font-graphik">CATEGORY</h1>
            </div>
            <a href="/">
              <img src={BSK} href="/" alt="BSK" className="h-10 md:h-12" />
            </a>
            <div className="flex md:order-2  md:space-x-0 rtl:space-x-reverse">
              <a href="/arts/add">
                <button
                  type="button"
                  className="text-white text-xl font-graphik px-6 bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  focus:ring-grey-300  focus:ring-grey-300 font-medium rounded-full py-3 text-center "
                >
                  LOGIN
                </button>
              </a>
            </div>

            
          </div>
        </nav>
      </div>
    </>
  );
}
