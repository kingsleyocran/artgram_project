import React, { useState, useEffect } from "react";
import postDataModel from "../../models/postDataModel";
import Image from "next/image";
import * as postRedux from "../../redux/features/posts";
import * as userRedux from "../../redux/features/users";
import * as utilBools from "../../redux/features/utilBools/utilBoolsSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import toast, { Toaster } from "react-hot-toast";

import UnlikeIcon from "../../public/assets/icons/unlike.svg";
import LikeIcon from "../../public/assets/icons/like.svg";
import SaveIcon from "../../public/assets/icons/save.svg";
import CommentIcon from "../../public/assets/icons/comment.svg";

function ImageCard({ post }: { post: postDataModel }) {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userRedux.reducer.selectUser);
  const loadingState = useAppSelector(postRedux.reducer.selectPostLoadingState);
  const [like, setlike] = useState(post?.likes);

  const [liked, setliked] = useState(false);
  console.log(post);
  useEffect(() => {
    const fetchData = async () => {
      if (userState?.likedPosts.some((e: any) => e.id === post.id)) {
        setliked(true);
        // console.log(userState);
      }
    };

    fetchData();
  }, [userState]);

  //Dispatch Handlers
  async function dispatchLikeHandler() {
    if (liked) {
      setliked(false);
      const postData = post;
      const userID = userState?.id ?? "";
      if (like > 0) {
        setlike((l: number) => l - 1);
        dispatch(postRedux.actions.unLikePostAsync({ userID, postData })).then(
          () => {
            if (loadingState == "failed") {
              toast.error("Failed to unlike post");
              setliked(true);
            }
          }
        );
      }
      // console.log("-1");
    } else {
      setliked(true);

      const postData = post;
      const userID = userState?.id ?? "";
      // console.log("+1");
      setlike((l: number) => l + 1);

      dispatch(postRedux.actions.likePostAsync({ userID, postData })).then(
        () => {
          if (loadingState == "failed") {
            toast.error("Failed to like post");
            setliked(false);
          }
        }
      );
    }
  }

  return (
    <div className="bg-[#141414] border-neutral-800 border rounded-2xl relative">
      <div className="break-inside  w-full rounded-lg top-0 cursor-pointer p-2 relative">
        {/* Username nad Image */}
        <div className="flex flex-row items-center gap-3 mb-4">
          <div className="h-[45px] w-[45px] md:h-[40px] md:w-[40px]  relative">
            <Image
              src={
                post?.userImgUrl == ""
                  ? "/assets/icons/profile_vector_black.svg"
                  : post?.userImgUrl
              }
              alt={post?.userName ?? ""}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "200px",
                margin: "0px",
                padding: "0px",
              }}
              priority
            />
            {/* <div className="bg-black">
							<span className="">{post?.likes}</span>
						</div> */}
          </div>
          <div className=" text-neutral-400 text-lg md:text-base">
            {post.userName}
          </div>
        </div>

        {/* Post Image */}
        <div className="relative w-full h-300">
          <Image
            src={post.imageUrl}
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
        <div className="pt-4 pb-2 flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <div className="flex items-center">
              <button
                onClick={() => {
                  dispatchLikeHandler();
                  // setlike(l => l);
                  // setlike((l: number) => (liked === true ? l - 1 : l + 1));
                }}
              >
                {!liked ? (
                  <UnlikeIcon width="30" height="23" viewBox="0 0 800 714" />
                ) : (
                  <LikeIcon width="30" height="23" viewBox="0 0 800 714" />
                )}
              </button>
              <span className="text-white ml-1 mr-2">{like} likes</span>
            </div>

            <button>
              <CommentIcon
                width="30"
                height="23"
                viewBox="0 0 826.429 826.428"
              />
            </button>
          </div>

          <button>
            <SaveIcon width="30" height="23" viewBox="0 0 560 710.063" />
          </button>
        </div>

        {/* Caption */}
        <div className="px-1 pt-1 pb-2">
          <p className="text-neutral-400 line-clamp-1 text-lg md:text-sm">
            {post.caption}
          </p>

          <p className="text-neutral-500 line-clamp-1 mt-0.5 text-base md:text-xs">
            {post.dateCreated}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
