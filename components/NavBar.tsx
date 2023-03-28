import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

function NavBar() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <nav
        className={`bg-neutral-900  bg-opacity-60 
         backdrop-filter backdrop-blur-xl sticky border-neutral-800 border-b-2 top-0 w-full z-50 transition-all ${
           showMobileMenu ? "rounded-b-3xl" : ""
         }`}
      >
        {/* NAVBAR DESKTOP */}
        <div className="flex justify-between max-w-5xl mx-8 2xl:mx-auto">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="relative flex flex-row justify-center items-center gap-3"
          >
            <div className="relative h-[30px] w-[30px] ">
              <Image
                src="/assets/brand/artgram-logo.png"
                alt="Picture of the author"
                fill
              />
            </div>

            <h1 className="font-medium text-white md:text-base text-xl text-th-primary-dark">
              Artgram
            </h1>
          </button>

          <div className="flex flex-row gap-2 items-center">
            {/* Search */}
            <div className="max-w-lg">
              <div className="relative p-3 rounded-md">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Image
                    src={"/assets/icons/search_white.svg"}
                    alt="Picture of the author"
                    width={16}
                    height={16}
                  />
                </div>
                <input
                  className="bg-transparent block w-full pl-10 sm:text-sm border-neutral-800 focus:ring-transparent text-white placeholder-neutral-500 focus:border-neutral-600 rounded-xl"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>

            
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`${
            showMobileMenu ? "h-400 mt-2 py-2" : "h-0 "
          }  max-w-7xl mx-5  xl:mx-auto transition-all duration-300 overflow-hidden`}
        >
          <div className="flex flex-col ">
            <div
              onClick={() => router.push("/shows")}
              className={` text-2xl rounded-2xl active:bg-th-container-on-surface p-5 transition-all`}
            >
              Shows
            </div>

            <div
              onClick={() => router.push("/for-podcasters")}
              className={` text-2xl rounded-2xl active:bg-th-container-on-surface p-5 transition-all`}
            >
              For Podcasters
            </div>

            <div
              onClick={() => router.push("/blogs")}
              className={`text-2xl rounded-2xl active:bg-th-container-on-surface p-5 transition-all`}
            >
              Blogs
            </div>

            <div
              onClick={() => router.push("/about")}
              className={` text-2xl rounded-2xl active:bg-th-container-on-surface p-5 transition-all`}
            >
              About
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
