import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleBottomCenterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import  ImageModal from "./ImageModal";

function ImageCard({ id, username, imageUrl, caption }) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div class="break-inside  mb-4 w-full rounded-lg top-0 cursor-pointer">
        {/* Post Image */}
        <img
          src={imageUrl}
          alt=""
          className="rounded-xl "
          onClick={() => setShowModal(true)}
        />

        {/* Username */}
        <div className="flex items-center mt-1">
          <UserCircleIcon className="w-7 h-7 text-gray-200" />
          <p className="text-gray-500 text-sm font-bold ml-1"> {username} </p>
        </div>
      </div>

      {/*Image Modal*/}
      <ImageModal
        key={id}
        id={id}
        isOpen={showModal}
        setIsOpen={setShowModal}
        imageUrl={imageUrl}
        caption={caption}
        username={username}
      />

      
      
    </>
  );
}

export default ImageCard;
