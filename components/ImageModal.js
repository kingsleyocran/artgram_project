import { React, Fragment, useRef, useState } from "react";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { Transition, Dialog } from "@headlessui/react";
import { db, storage } from "../firebase";
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import {
  ChatBubbleBottomCenterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function ImageModal({
  id,
  isOpen,
  setIsOpen,
  title,
  caption,
  imageUrl,
  username,
}) {
  const { data: session } = useSession();

  return (
    <Transition.Root show={isOpen}>
      <Dialog
        as="div"
        className="fixed z-0 inset-0 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div
          className="flex items-end justify-center min-h-[800px]
            sm:min-h-screen pt-4 px-4 pb-4 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></Dialog.Overlay>
          </Transition.Child>
          {/* This is to trick the browser into centering the modal contents */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-10 mx-auto lg:max-w-1xl">
                {/*content*/}
                <div className="border-0 rounded-2xl shadow-lg relative flex flex-col md:flex-row  w-full bg-white outline-none focus:outline-none">
                  {/*Image*/}
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt=""
                      className="rounded-t-2xl md:rounded-l-2xl md:rounded-none md:max-h-[45rem] max-h-[17rem] w-full md:max-w-[25rem] max-w-[18rem] md:object-none object-cover"
                    />

                    {/* Close Button SM */}
                    <div className="w-full flex justify-end p-2 md:hidden absolute top-0">
                      <button
                        className="text-red-500 bg-red-500 font-bold uppercase p-2  rounded-full text-sm outline-none hoverScale"
                        type="button"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/*body*/}
                  <div className="px-6 py-6 relative">
                    {/* Close Button LG */}
                    <div className="w-full justify-end mb-5 md:flex hidden">
                      <button
                        className="text-red-500 bg-red-500 font-bold uppercase p-2  rounded-full text-sm outline-none hoverScale"
                        type="button"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    {/* Caption */}
                    <p className="text-gray-500 text-lg text-left font-medium  md:max-w-xs max-w-[15rem] mb-8">
                      {caption}
                    </p>

                    {/* Username */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center">
                        <UserCircleIcon className="w-7 h-7 text-gray-200" />
                        <p className="text-gray-500 text-sm font-bold ml-1">
                          {username}
                        </p>
                      </div>

                      {/* Follow Button */}
                      {session && (
                        <button
                        className="text-gray-500 bg-gray-100 font-bold px-2.5 py-1.5  rounded-full text-xs outline-none"
                        type="button"
                        onClick={() => setIsOpen(false)}
                      >
                        Follow
                      </button>
                      )}
                    </div>
                    
                    {/* Comment */}
                    {session && (

                      <div className="w-full">
                      <div className="relative mt-1 rounded-full">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                          <ChatBubbleBottomCenterIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          className="bg-gray-50 block w-full pl-10 sm:text-sm
      border-gray-300 focus:ring-gray-400
      focus:border-gray-400 rounded-full"
                          type="text"
                          placeholder="Comment"
                        />
                      </div>
                    </div>
                    )}

                    
                    
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ImageModal;
