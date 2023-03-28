import React from "react";
import postDataModel from "../../models/postDataModel";

// export default interface postDataModel {

// }

function ImageCard({ post }: { post: postDataModel }) {
  return (
    <div className="bg-[#141414] border-neutral-800 border rounded-2xl mb-3">
      <div className="break-inside  w-full rounded-lg top-0 cursor-pointer p-2">
        <div className="h-12 text-white text-lg">{post.title}</div>

        {/* Post Image */}
        <img
          src={post.imageUrl}
          alt=""
          className="rounded-xl "
          //onClick={() => setShowModal(true)}
        />
      </div>
    </div>
  );
}

export default ImageCard;
