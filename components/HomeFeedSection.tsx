import React,{useEffect} from "react";
import ImageCard from "./cards/ImageCard";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import * as postsRedux from "../redux/features/posts";


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

  useEffect(() => {
    dispatch(
      postsRedux.actions.fetchBatchPostsAsync()
    );
  }, []);

  return (
    <main className=" max-w-7xl md:mx-8 mx-4 xl:mx-auto mt-4">
      <div className="masonry-1-col md:masonry-2-col lg:masonry-3-col xl:masonry-4-col md:gap-y-3">
        {postsState?.map((post) => (
          <ImageCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export default HomeFeed;
