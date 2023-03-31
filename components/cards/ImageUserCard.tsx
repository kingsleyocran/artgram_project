import React from "react";
import postDataModel from "../../models/postDataModel";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import * as utilBools from "../../redux/features/utilBools/utilBoolsSlice";

import UnlikeIcon from "../../public/assets/icons/unlike.svg";

function ImageUserCard({ post }: { post: any }) {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={async () => {
        dispatch(utilBools.setPostEditData(post));
        const open: any = true;
        dispatch(utilBools.setIsPostModalOpen(open));
      }}
      className="bg-[#141414] border-neutral-800 border rounded-2xl relative"
    >
      <div className="break-inside  w-full rounded-lg top-0 cursor-pointer p-2 relative">
        {/* Post Image */}
        <div className="relative w-full h-150">
          <Image
            src={post?.imageUrl}
            alt=""
            fill
            priority
            style={{
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
        </div>

        {/* Buttons */}
        <div className="pt-4 pb-2 flex flex-row item-center gap-2">
          <button>
            <UnlikeIcon width="18" height="23" viewBox="0 0 800 714" />
          </button>
          <p className="text-neutral-400 line-clamp-1 text-lg md:text-sm">
            {post?.likes}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageUserCard;
