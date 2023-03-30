import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import {setIsSideBarOpen, selectIsSideBarOpen} from "../redux/features/utilBools/utilBoolsSlice";
import { useState, useEffect } from "react";

function NavBar() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector(
    selectIsSideBarOpen
  );

  return (
    <>
      <nav
        className={`bg-neutral-900  bg-opacity-60 
         backdrop-filter backdrop-blur-xl sticky border-neutral-800 border-b-2 top-0 w-full z-50 transition-all ${
           showMobileMenu ? "rounded-b-3xl" : ""
         }`}
      >
        {/* NAVBAR DESKTOP */}
        <div className="flex h-[64px]  justify-between w-full max-w-7xl px-6  xl:mx-auto">
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

          <div className="flex flex-row gap-4 items-center">
            {/* Search */}
            <div className="max-w-lg hidden md:flex">
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

            {/* Search Button Mobile  */}
            <button
              onClick={() => {}}
              //todo: search drops under nav
              className="md:hidden  relative flex flex-row justify-center items-center gap-3"
            >
              <div className="relative h-[20px] w-[20px] ">
                <Image
                  src={"/assets/icons/search_white.svg"}
                  alt="Picture of the author"
                  fill
                  priority
                />
              </div>
            </button>

            {/* Profile Side  */}
            <button
              onClick={() =>{
                const open:any = true;
                dispatch(setIsSideBarOpen(open))}}
              className="relative flex flex-row justify-center items-center gap-3"
            >
              <div className="relative h-[30px] w-[30px] ">
                <Image
                  src="/assets/icons/profile_vector.svg"
                  alt="Picture of the author"
                  fill
                  priority
                />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
