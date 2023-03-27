import React from "react";
import logoPath from "../assets/images/comma_logo.png";
import logoPathMobile from "../assets/images/comma_logo_mobile.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  PlusCircleIcon,
  Bars3Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);

  console.log(session);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-100">
      <div className="flex justify-between  bg-white max-w-7xl mx-5 xl:mx-auto">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-28"
        >
          <Image
            src={logoPath}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative  lg:hidden w-10 flex-shrink-0"
        >
          <Image
            src={logoPathMobile}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Search */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm
            border-gray-300 focus:ring-gray-400
            focus:border-gray-400 rounded-xl"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Menu */}

        {session ? (
          <>
            <div className="flex items-center gap-4">
              <HomeIcon className="navBtn" onClick={() => router.push("/")} />
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                //hidden lg:inline-grid
                className=" navBtn"
              />

              {
                //<HeartIcon className="hidden lg:inline-grid navBtn" />
                //<ChatBubbleOvalLeftEllipsisIcon className="hidden lg:inline-grid navBtn" />
              }

              <UserCircleIcon
                onClick={() => router.push("/profile")}
                 //hidden lg:inline-grid
                className=" navBtn"
              />

              {
                //<Bars3Icon className="lg:hidden navBtn" />
              }
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <button
                className="rounded-full px-3.5 py-2 bg-gray-200 text-black text-sm"
                onClick={signIn}
              >
                Log in
              </button>
              <button
                className="rounded-full px-3.5 py-2 bg-orange-400 text-white text-sm"
                onClick={() => router.push("/auth/sign-up")}
              >
                Sign up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
