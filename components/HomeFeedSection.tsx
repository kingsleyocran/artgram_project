import React,{useEffect} from "react";
import ImageCard from "./cards/ImageCard";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import * as postsRedux from "../redux/features/posts";
import * as utilBools from "../redux/features/utilBools/utilBoolsSlice";

function HomeFeed() {
  // const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  // const isTab = useMediaQuery({ query: `(max-width: 1024px)` });

  const dispatch = useAppDispatch();
  const postsState = useAppSelector(
    postsRedux.reducer.selectPosts
  );
  const loadingState = useAppSelector(
    postsRedux.reducer.selectPostsLoadingState
  );

  const isModalOpen = useAppSelector(
    utilBools.selectIsSideBarOpen
  );

  useEffect(() => {
    dispatch(
      postsRedux.actions.fetchBatchPostsAsync()
    );
  }, []);

  return (
    <main className=" max-w-7xl md:px-6 px-4  xl:mx-auto mt-4 mb-12">
      <div className={`grid grid-cols-1 ${isModalOpen ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} gap-y-3 gap-x-3`}>
        {postsState?.map((post) => (
          <ImageCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export default HomeFeed;
