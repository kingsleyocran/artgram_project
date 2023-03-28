import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { reducer } from "./index";
import getUserByID from "../../../backend/firebase/users/getUserByID";
import addNewUser from "../../../backend/firebase/users/addUser";
import deleteUser from "../../../backend/firebase/users/deleteUser";
import updateUser from "../../../backend/firebase/users/updateUser";
import { updateImage } from "../../../backend/firebase/users/updateUser";
import {
  unfollowUser,
  followUser,
} from "../../../backend/firebase/users/followUser";
import userDataModel from "../../../models/userDataModel";
import { deleteUserNull } from "./reducer";

//ASYNC THUNKS

export async function fetchUserFunction(userID: string ) {
  const data: userDataModel | null = await getUserByID(userID);

  return data!;
}

export const fetchUserAsync = createAsyncThunk(
  "user/getUserByID",
  async ({ userID }: { userID: string }) => {
    const data: userDataModel | null = await getUserByID(userID);

    return data!;
  }
);

export const addNewUserAsync = createAsyncThunk(
  "user/addNewUser",
  async ({
    dataObject,
    userID,
  }: {
    selectedFile: string;
    dataObject: any;
    userID: string;
  }) => {
    await addNewUser(dataObject, userID);
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async ({ dataObject, userID }: { dataObject: any; userID: string }) => {
    await updateUser(dataObject, userID);
  }
);

export const updateUserImageAsync = createAsyncThunk(
  "user/updateImage",
  async ({
    selectedFile,
    userID,
  }: {
    selectedFile: string;
    userID: string;
  }) => {
    Promise.all([
      selectedFile ? await updateImage(selectedFile, userID) : true,
    ]);
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async ({ userID }: { userID: string }) => {
    await deleteUser(userID);
  }
);

export const followUserAsync = createAsyncThunk(
  "user/followUser",
  async ({
    userID,
    userToFollow,
  }: {
    userID: string;
    userToFollow: string;
  }) => {
    await followUser(userID, userToFollow);
  }
);

export const unfollowUserAsync = createAsyncThunk(
  "user/unfollowUser",
  async ({
    userID,
    userToFollow,
  }: {
    userID: string;
    userToFollow: string;
  }) => {
    await unfollowUser(userID, userToFollow);
  }
);

//THUNK LOGICS
export const checkBeforeFetchUser =
  (userID: string): AppThunk =>
  (dispatch, getState) => {
    const currentValue = reducer.selectUser(getState());
    if (currentValue) {
      dispatch(fetchUserAsync({ userID }));
    }
  };

export const addNewUserAndFetch =
  (dataObject: any, userID: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(addNewUserAsync({ dataObject, userID }));
    dispatch(fetchUserAsync({ userID }));
  };

export const updateProjectAndFetch =
  (dataObject: any, userID: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(updateUserAsync({ dataObject, userID }));
    dispatch(fetchUserAsync({ userID }));
  };

export const updateProjectImageAndFetch =
  (selectedFile: any, userID: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(updateUserImageAsync({ selectedFile, userID }));
    dispatch(fetchUserAsync({ userID }));
  };

export const deleteUserAndFetch =
  (dataId: string, userID: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(deleteUserAsync({ userID }));
    dispatch(deleteUserNull());
  };

export const followUserAndFetch =
  (userID: string, userToFollow: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(followUserAsync({ userID, userToFollow }));
    dispatch(fetchUserAsync({ userID }));
  };

export const unfollowUserAndFetch =
  (userID: string, userToFollow: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(unfollowUserAsync({ userID, userToFollow }));
    dispatch(fetchUserAsync({ userID }));
  };
