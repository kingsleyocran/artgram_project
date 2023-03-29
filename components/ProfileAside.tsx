import React, { useState, useEffect } from "react";
import * as userRedux from "../redux/features/users";
import * as postsRedux from "../redux/features/posts";
import * as utilBools from "../redux/features/utilBools/utilBoolsSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

import CloseIcon from "../public/assets/icons/close.svg";
import NotificationIcon from "../public/assets/icons/notifications.svg";

function ProfileAside() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userRedux.reducer.selectUser);
  const loadingState = useAppSelector(userRedux.reducer.selectUserLoadingState);

  const userPostsState = useAppSelector(postsRedux.reducer.selectUserPosts);
  const loadingPostState = useAppSelector(
    postsRedux.reducer.selectUserPostsLoadingState
  );

  const isSideBarOpen = useAppSelector(utilBools.selectIsSideBarOpen);

  const { sessionData } = useAuth();

  useEffect(() => {
    if (sessionData!.uid) {
      dispatch(userRedux.actions.checkBeforeFetchUser(sessionData!.uid));
      dispatch(postsRedux.actions.checkBeforeFetchUserPosts(sessionData!.uid));
    }
  }, []);

  return (
    <aside
      className={`flex-none ${
        isSideBarOpen ? "basis-full md:basis-1/4 px-4" : "basis-0 "
      } overflow-hidden  border-neutral-800 md:border-l-2 transition-all duration-600 ease-out h-screen sticky top-0  bg-[#141414]`}
    >
      {/* Icon Bar */}
      <div className="relative flex flex-col h-screen">
        <div className="mt-4 flex flex-row justify-between">
          <button
            className="flex justify-center items-center h-[30px] w-[30px] rounded-full bg-neutral-600"
            onClick={() => dispatch(utilBools.setIsSideBarOpen(false))}
          >
            <CloseIcon width="15" height="15" viewBox="0 0 27.1 27.1" />
          </button>

          <button className="">
            <NotificationIcon width="22" height="40" viewBox="0 0 640 800" />
          </button>
        </div>

        {/* Profile picture */}
        <div className="flex flex-col items-center justify-center flex-none w-full mt-4">
          <div className="h-[120px] w-[120px] md:h-[90px] md:md:w-[90px]  mb-4 relative">
            <Image
              src={
                userState?.imageUrl || userState?.imageUrl == ""
                  ? "/assets/icons/profile_vector.svg"
                  : userState?.imageUrl
              }
              alt={userState?.name ?? ""}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "200px",
                margin: "0px",
                padding: "0px",
              }}
              priority
            />
          </div>

          <p className="text-white text-xl md:text-sm">{userState?.name}</p>

          <button className="mt-4 text-lg md:text-sm py-1.5 px-5 bg-blue-600 text-white  rounded-full">
            Edit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 mt-6">
          {/* Posts */}
          <div className="flex flex-col items-center">
            <p className="text-white font-semibold text-xl md:text-lg">
              {userPostsState?.length}
            </p>
            <p className="text-neutral-600 text-base md:text-xs">Posts</p>
          </div>

          {/* Followers */}
          <div className="flex flex-col items-center">
            <p className="text-white font-semibold text-xl md:text-lg">
              {userState?.followers.length}
            </p>
            <p className="text-neutral-600 text-base md:text-xs">Followers</p>
          </div>

          {/* Following */}
          <div className="flex flex-col items-center">
            <p className="text-white font-semibold text-xl md:text-lg">
              {userState?.following.length}
            </p>
            <p className="text-neutral-600 text-base md:text-xs">Following</p>
          </div>
        </div>

        <button onClick={()=>{dispatch(utilBools.setIsPostModalOpen(true))}}
         className="mt-8 w-full flex justify-stretch  flex-row justify-center py-5 md:py-3 text-xl text-white md:text-base rounded-2xl bg-blue-500">
          Create Post
        </button>
      </div>
    </aside>
  );
}

export default ProfileAside;
