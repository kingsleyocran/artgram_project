import { React, Fragment, useRef, useState } from "react";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { Transition, Dialog } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { db, storage } from "../firebase";
import { addDoc, serverTimestamp, updateDoc, collection, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

function PostModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    //Create post and add to firestore
    //Get post ID
    //Upload the image with post ID
    //Get download URL

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log("new doc added id", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setLoading(false);
    setOpen(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open}>
      <Dialog
        as="div"
        className="fixed z-0 inset-0 overflow-y-auto"
        onClose={setOpen}
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
            <div
              className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full
            sm:p-6"
            >
              {selectedFile ? (
                <img
                  className="rounded-lg mb-5"
                  src={selectedFile}
                  alt=""
                  onClick={() => setSelectedFile(null)}
                />
              ) : (
                <div
                  onClick={() => filePickerRef.current.click()}
                  className="mx-auto mb-3 flex items-center justify-center h-12 w-12 rounded-full
                bg-orange-100 cursor-pointer
                "
                >
                  <CameraIcon
                    className="h-6 w-6 text-orange-400"
                    aria-hidden="true"
                  />
                </div>
              )}

              <div>
                <div className=" text-center mt-1 sm:mt-1 mb-5 sm:mb-5">
                  <Dialog.Title
                    as="h3"
                    className="test-lg leeding-6 font-medium text-gray-900 mb-5"
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
                      className="bg-gray-50 block w-full pl-5 sm:text-sm
                      border-gray-300 focus:ring-gray-400
                      focus:border-gray-400 rounded-xl"
                      ref={captionRef}
                      placeholder="Please enter a caption..."
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    onClick={uploadPost}
                    className="inline-flex justify-center w-full rounded-xl shadow-sm
                        px-5 py-3 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                        focus:offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                        disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  >
                    {loading ? "Uploading Post..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default PostModal;
