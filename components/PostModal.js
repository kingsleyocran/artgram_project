import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Transition, Dialog } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { db, storage } from "../firebase";
import Image from "next/image";
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import * as utilBools from "../redux/features/utilBools/utilBoolsSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";

function PostModal() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector(utilBools.selectIsPostModalOpen);

  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPostHandler = async () => {
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={isSideBarOpen}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={() => dispatch(utilBools.setIsPostModalOpen(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => dispatch(utilBools.setIsPostModalOpen(false))}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all">
                {selectedFile ? (
                  <div className="h-350 relative mb-8">
                    <Image
                      src={selectedFile}
                      alt=""
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "16px",
                        margin: "0px",
                        padding: "0px",
                      }}
                      priority
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => filePickerRef.current?.click()}
                    className="mx-auto mb-3 flex items-center justify-center h-12 w-12 rounded-full
                bg-blue-500 cursor-pointer
                "
                  >
                    <CameraIcon
                      className="h-6 w-6 text-blue-200"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className=" text-center mt-1 sm:mt-1 mb-5 sm:mb-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl md:text-base leeding-6 font-medium text-white mb-5"
                    >
                      Upload your artwork
                    </Dialog.Title>

                    <div>
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        type="text"
                        className="bg-neutral-700 block w-full pl-5 sm:text-sm
                      border-neutral-600 focus:ring-neutral-600 text-white text-xl md:text-base
                      focus:border-neutral-600 rounded-xl placeholder-neutral-500"
                        ref={captionRef}
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={!selectedFile}
                      onClick={uploadPostHandler}
                      className="inline-flex justify-center w-full rounded-xl shadow-sm text-xl md:text-base
                        px-5 py-3 bg-blue-600  font-medium text-white hover:bg-blue-700 focus:outline-none
                        focus:offset-2 focus:blue-red-500 sm:text-sm disabled:bg-neutral-500
                        disabled:cursor-not-allowed hover:disabled:bg-neutral-400"
                    >
                      {false ? "Uploading Post..." : "Upload Post"}
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(utilBools.setIsPostModalOpen(false));
                        setSelectedFile(null);
                      }}
                      className="inline-flex justify-center w-full rounded-xl shadow-sm text-xl md:text-base
                        px-5 py-3 bg-neutral-900  font-medium text-white hover:bg-neutral-800 focus:outline-none
                        focus:offset-2 focus:blue-red-500 sm:text-sm disabled:bg-neutral-900
                        disabled:cursor-not-allowed hover:disabled:bg-neutral-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default PostModal;
