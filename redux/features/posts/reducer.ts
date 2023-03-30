import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { actions } from "./index";
import postDataModel, {postCommentDataModel} from "../../../models/postDataModel";
import commentDataModel from "../../../models/commentDataModel";


export interface postState {
  posts: Array<postDataModel> | null;
  postsUser: Array<postDataModel> | null;
  post: postCommentDataModel | null;

  postStatus: "idle" | "loading" | "failed" | "success";
  postsUserStatus: "idle" | "loading" | "failed" | "success";
  postOpStatus: "idle" | "loading" | "failed" | "success";
  postDelStatus: "idle" | "loading" | "failed" | "success";
}

const initialState: postState = {
  posts: null,
  postsUser: null,
  post: null,

  postStatus: "idle",
  postsUserStatus: "idle",
  postOpStatus: "idle",
  postDelStatus: "idle",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      //Fetch Batch Posts Async
      .addCase(actions.fetchBatchPostsAsync.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(actions.fetchBatchPostsAsync.fulfilled, (state, action) => {
        state.postStatus = "idle";
        state.posts = action.payload;
      })
      .addCase(actions.fetchBatchPostsAsync.rejected, (state) => {
        state.postStatus = "failed";
      })

      //Fetch User Post Async
      .addCase(actions.fetchUserPostsAsync.pending, (state) => {
        state.postsUserStatus = "loading";
      })
      .addCase(actions.fetchUserPostsAsync.fulfilled, (state, action) => {
        state.postsUserStatus = "idle";
        state.postsUser = action.payload;
      })
      .addCase(actions.fetchUserPostsAsync.rejected, (state) => {
        state.postsUserStatus = "failed";
      })

      //Fetch Post Async
      .addCase(actions.fetchPostDataAsync.pending, (state) => {
        state.postOpStatus = "loading";
        state.post = null;
      })
      .addCase(actions.fetchPostDataAsync.fulfilled, (state, action) => {
        state.postOpStatus = "idle";
        state.post = action.payload;
      })
      .addCase(actions.fetchPostDataAsync.rejected, (state) => {
        state.postOpStatus = "failed";
      })

      //Add Post Async
      .addCase(actions.addNewPostAsync.pending, (state) => {
        state.postOpStatus = "loading";
      })
      .addCase(actions.addNewPostAsync.fulfilled, (state, action) => {
        state.postOpStatus = "idle";
      })
      .addCase(actions.addNewPostAsync.rejected, (state) => {
        state.postOpStatus = "failed";
      })

      //Update Post Async
      .addCase(actions.updatePostAsync.pending, (state) => {
        state.postOpStatus = "loading";
      })
      .addCase(actions.updatePostAsync.fulfilled, (state, action) => {
        state.postOpStatus = "idle";
      })
      .addCase(actions.updatePostAsync.rejected, (state) => {
        state.postOpStatus = "failed";
      })

      //Update Post Image Async
      .addCase(actions.updatePostImageAsync.pending, (state) => {
        state.postOpStatus = "loading";
      })
      .addCase(actions.updatePostImageAsync.fulfilled, (state, action) => {
        state.postOpStatus = "idle";
      })
      .addCase(actions.updatePostImageAsync.rejected, (state) => {
        state.postOpStatus = "failed";
      })

      //Delete Post Async
      .addCase(actions.deletePostAsync.pending, (state) => {
        state.postDelStatus = "loading";
      })
      .addCase(actions.deletePostAsync.fulfilled, (state, action) => {
        state.postDelStatus = "idle";
      })
      .addCase(actions.deletePostAsync.rejected, (state) => {
        state.postDelStatus = "failed";
      })

      //Add Comment Async
      .addCase(actions.addCommentAsync.pending, (state) => {
        state.postOpStatus = "loading";
      })
      .addCase(actions.addCommentAsync.fulfilled, (state, action) => {
        state.postOpStatus = "idle";
      })
      .addCase(actions.addCommentAsync.rejected, (state) => {
        state.postOpStatus = "failed";
      })

      //Like Post Async
      .addCase(actions.likePostAsync.pending, (state) => {
        state.postOpStatus = "loading";
      })
      .addCase(actions.likePostAsync.fulfilled, (state, action) => {
        state.postOpStatus = "idle";
      })
      .addCase(actions.likePostAsync.rejected, (state) => {
        state.postOpStatus = "failed";
      })

      //Unlike Post Async
      .addCase(actions.unLikePostAsync.pending, (state) => {
        state.postOpStatus = "loading";
      })
      .addCase(actions.unLikePostAsync.fulfilled, (state, action) => {
        state.postOpStatus = "idle";
      })
      .addCase(actions.unLikePostAsync.rejected, (state) => {
        state.postOpStatus = "failed";
      });
  },
});

export const {  } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectUserPosts = (state: RootState) => state.post.postsUser;
export const selectPost = (state: RootState) => state.post.post;

export const selectPostsLoadingState = (state: RootState) => state.post.postStatus;
export const selectPostLoadingState = (state: RootState) => state.post.postOpStatus;
export const selectPostDelLoadingState = (state: RootState) => state.post.postDelStatus;
export const selectUserPostsLoadingState = (state: RootState) => state.post.postsUserStatus;


export default postSlice.reducer;