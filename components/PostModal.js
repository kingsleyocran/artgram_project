import React, { Fragment, useRef, useState, useEffect } from "react";
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
import * as postRedux from "../redux/features/posts";
import * as userRedux from "../redux/features/users";
import * as utilBools from "../redux/features/utilBools/utilBoolsSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import toast, { Toaster } from "react-hot-toast";

function PostModal() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector(utilBools.selectIsPostModalOpen);
  const editData = useAppSelector(utilBools.selectPostEditData);
  const userState = useAppSelector(userRedux.reducer.selectUser);
  const loadingState = useAppSelector(postRedux.reducer.selectPostLoadingState);
  const deletingState = useAppSelector(postRedux.reducer.selectPostDelLoadingState);
  
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);

  const [caption, setcaption] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  //Form handlers
  const handleCaptionChange = (event) => {
    //event.preventDefault()
    setcaption(event.target.value);
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  async function setEditData(data) {
    setcaption(data?.caption);
    setimageUrl(data?.imageUrl);
  }

  //Modal Form Functions
  useEffect(() => {
    const fetchData = async () => {
      if (editData) {
        await setEditData(editData);
      }
    };

    fetchData();
  }, [editData]);

  function closeModalClear() {
    dispatch(utilBools.setIsPostModalOpen(false));
    dispatch(utilBools.setPostEditData(null));
    resetForm();
  }
  function resetForm() {
    setcaption("");
    setimageUrl("");
    setSelectedFile(null);
  }

  //Dispatch Handlers
  async function dispatchAddHandler() {
    const dataObject = {
      caption: caption,
      imageUrl: "",
      userID: userState.id,
      userName: userState.name,
      userImgUrl: userState.imageUrl,
      likes: 0,
    };
    const userID = userState.id;

    dispatch(
      postRedux.actions.addNewPostAsync({ selectedFile, dataObject })
    ).then(() => {
      dispatch(postRedux.actions.fetchBatchPostsAsync());
      dispatch(postRedux.actions.fetchUserPostsAsync(userID));

      if (loadingState == "idle") {
        toast.success("Post uploaded successfully");
      } else if (loadingState == "failed") {
        toast.error("Post upload failed");
      }

      closeModalClear();
    });
  }

  async function dispatchUpdateHandler() {
    const dataObject = {
      ...editData,
      caption: caption,
    };
    const postID = editData.id;
    const userID = userState.id;

    dispatch(
      postRedux.actions.updatePostAsync({ dataObject, postID, userID })
    ).then(() => {
      dispatch(postRedux.actions.fetchBatchPostsAsync());
      dispatch(postRedux.actions.fetchUserPostsAsync(userID));

      if (loadingState == "idle") {
        toast.success("Post updated successfully");
      } else if (loadingState == "failed") {
        toast.error("Post update failed");
      }

      closeModalClear();
    });
  }

  async function dispatchUpdateImageHandler() {
    const postID = editData.id;
    const userID = userState.id;

    dispatch(
      postRedux.actions.updatePostImageAsync({ selectedFile, postID })
    ).then(() => {
      dispatch(postRedux.actions.fetchBatchPostsAsync());
      dispatch(postRedux.actions.fetchUserPostsAsync(userID));

      if (loadingState == "idle") {
        toast.success("Post updated successfully");
      } else if (loadingState == "failed") {
        toast.error("Post update failed");
      }

      closeModalClear();
    });
  }

  async function dispatchDeleteHandler() {
    const postID = editData.id;
    const userID = userState.id;

    dispatch(postRedux.actions.deletePostAsync({ postID, userID })).then(() => {
      dispatch(postRedux.actions.fetchBatchPostsAsync());
      dispatch(postRedux.actions.fetchUserPostsAsync(userID));

      if (deletingState == "idle") {
        toast.success("Post deleted successfully");
      } else if (deletingState == "failed") {
        toast.error("Post deleted failed");
      }
      closeModalClear();
    });
  }

  return (
    <Transition.Root show={isSideBarOpen}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={() => closeModalClear()}
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
            onClick={() => closeModalClear()}
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
                {/* Post Image */}
                {editData && !selectedFile && (
                  <div className="relative w-full h-200 mb-6">
                    <Image
                      src={editData?.imageUrl}
                      alt=""
                      fill
                      priority
                      style={{
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                )}

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

                    {}
                    <div className="mt-2">
                      <textarea
                        defaultValue={caption}
                        value={caption}
                        onChange={handleCaptionChange}
                        type="text"
                        className="bg-neutral-700 block w-full pl-5 sm:text-sm
                      border-neutral-600 focus:ring-neutral-600 text-white text-xl md:text-base
                      focus:border-neutral-600 rounded-xl placeholder-neutral-500"
                        ref={captionRef}
                        rows="3"
                        placeholder="Please enter a description..."
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (editData) {
                          if (selectedFile) {
                            dispatchUpdateImageHandler();
                          } else {
                            dispatchUpdateHandler();
                          }
                        } else {
                          dispatchAddHandler();
                        }
                      }}
                      className="inline-flex justify-center w-full rounded-xl shadow-sm text-xl md:text-base
                        px-5 py-3 bg-blue-600  font-medium text-white hover:bg-blue-700 focus:outline-none
                        focus:offset-2 focus:blue-red-500 sm:text-sm disabled:bg-neutral-500
                        disabled:cursor-not-allowed hover:disabled:bg-neutral-400"
                    >
                      {loadingState == "loading"
                        ? "Loading..."
                        : editData
                        ? "Update Post"
                        : "Upload Post"}
                    </button>
                  </div>

                  <div className="mt-4 flex ">
                    {editData && (
                      <button
                        type="button"
                        onClick={() => {
                          dispatchDeleteHandler();
                        }}
                        className="inline-flex justify-center w-full rounded-xl shadow-sm text-xl md:text-base
                        px-5 py-3 bg-red-600  font-medium text-white hover:bg-neutral-800 focus:outline-none
                        focus:offset-2 focus:blue-red-500 sm:text-sm disabled:bg-neutral-900
                        disabled:cursor-not-allowed hover:disabled:bg-neutral-400"
                      >
                        {deletingState == "loading"
                          ? "Deleting..."
                          : "Delete Post"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        closeModalClear();
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
