import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { reducer } from "./index";
import getAllPosts from "../../../backend/firebase/posts/getAllPosts";
import getPostByID from "../../../backend/firebase/posts/getPostByID";
import getUserPosts from "../../../backend/firebase/posts/getUserPosts";
import addPost from "../../../backend/firebase/posts/addPost";
import deletePost from "../../../backend/firebase/posts/deletePost";
import updatePost from "../../../backend/firebase/posts/updatePost";
import { updateImage } from "../../../backend/firebase/posts/updatePost";
import addComment from "../../../backend/firebase/comments/addComment";
import { addLike, unLike } from "../../../backend/firebase/posts/addLike";

import postDataModel, {
  postCommentDataModel,
} from "../../../models/postDataModel";

//ASYNC THUNKS
export const fetchBatchPostsAsync = createAsyncThunk(
  "posts/getAllPosts",
  async () => {
    const data: Array<postDataModel> = await getAllPosts();
    return data;
  }
);

export const fetchUserPostsAsync = createAsyncThunk(
  "posts/getUserPosts",
  async (userID: string) => {
    const data: Array<postDataModel> = await getUserPosts(userID);
    return data;
  }
);

export const fetchPostDataAsync = createAsyncThunk(
  "posts/getPostByID",
  async (postID: string) => {
    const data: postCommentDataModel | null = await getPostByID(postID);
    return data;
  }
);

export const addNewPostAsync = createAsyncThunk(
  "posts/addPost",
  async ({
    selectedFile,
    dataObject,
  }: {
    selectedFile: string;
    dataObject: any;
  }) => {
    await addPost(selectedFile, dataObject);
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async ({
    dataObject,
    postID,
    userID,
  }: {
    dataObject: any;
    postID: string;
    userID: string;
  }) => {
    await updatePost(dataObject, postID, userID);
  }
);

export const updatePostImageAsync = createAsyncThunk(
  "posts/updateImage",
  async ({
    selectedFile,
    postID,
  }: {
    selectedFile: string;
    postID: string;
  }) => {
    Promise.all([
      selectedFile ? await updateImage(selectedFile, postID) : true,
    ]);
  }
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async ({ postID, userID }: { postID: any; userID: any }) => {
    const data = await deletePost(postID, userID);
  }
);

export const addCommentAsync = createAsyncThunk(
  "posts/addComment",
  async ({
    postID,
    dataObject,
  }: {
    postID: string;
    dataObject: any;
  }) => {
    await addComment(dataObject,postID);
  }
);

export const likePostAsync = createAsyncThunk(
  "posts/addLike",
  async ({
    userID,
    postData,
  }: {
    userID: string;
    postData: any;
  }) => {
    await addLike(postData, userID);
  }
);

export const unLikePostAsync = createAsyncThunk(
  "posts/unLike",
  async ({
    userID,
    postData,
  }: {
    userID: string;
    postData: any;
  }) => {
    await unLike(postData, userID);
  }
);

//THUNK LOGICS
export const checkBeforeFetchPosts = (): AppThunk => (dispatch, getState) => {
  const currentValue = reducer.selectPosts(getState());
  if (!currentValue) {
    dispatch(fetchBatchPostsAsync());
  }
};

export const addNewPostAndFetch =
  (dataObject: any, selectedFile: any, userID: any): AppThunk =>
  (dispatch, getState) => {
    dispatch(addNewPostAsync({ selectedFile, dataObject }));
    dispatch(fetchBatchPostsAsync());
    dispatch(fetchUserPostsAsync(userID));
  };

export const updatePostAndFetch =
  (dataObject: any, postID: string, userID: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(updatePostAsync({ dataObject, postID, userID }));
    dispatch(fetchBatchPostsAsync());
    dispatch(fetchUserPostsAsync(userID));
  };

export const updatePostImageAndFetch =
  (postID: string, userID: string, selectedFile: any): AppThunk =>
  (dispatch, getState) => {
    dispatch(updatePostImageAsync({ selectedFile, postID }));
    dispatch(fetchBatchPostsAsync());
    dispatch(fetchUserPostsAsync(userID));
  };

export const deletePostAndFetch =
  (userID: string, postID: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(deletePostAsync({ postID, userID }));
    dispatch(fetchBatchPostsAsync());
    dispatch(fetchUserPostsAsync(userID));
  };

  export const addCommentAndFetch =
  (dataObject: any, postID: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(addCommentAsync({ postID, dataObject }));
    dispatch(fetchPostDataAsync(postID));
  };
