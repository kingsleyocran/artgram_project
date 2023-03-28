import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { actions } from "./index";
import userDataModel from "../../../models/userDataModel";

export interface UserState {
  userData: userDataModel | null;
  status: "idle" | "loading" | "failed";
  followStatus: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  userData: null,
  status: "idle",
  followStatus: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUserNull: (state) => {
      state.userData = null;
    },
  },

  extraReducers: (builder) => {
    builder
      //Fetch User Async
      .addCase(actions.fetchUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.fetchUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      })
      .addCase(actions.fetchUserAsync.rejected, (state) => {
        state.status = "failed";
      })
      
      //Add User Async
      .addCase(actions.addNewUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addNewUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(actions.addNewUserAsync.rejected, (state) => {
        state.status = "failed";
      })

      //Update User Async
      .addCase(actions.updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(actions.updateUserAsync.rejected, (state) => {
        state.status = "failed";
      })

      //Update User Image Async
      .addCase(actions.updateUserImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.updateUserImageAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(actions.updateUserImageAsync.rejected, (state) => {
        state.status = "failed";
      })

      //Delete User Async
      .addCase(actions.deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.deleteUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(actions.deleteUserAsync.rejected, (state) => {
        state.status = "failed";
      })

      //Follow User Async
      .addCase(actions.followUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.followUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(actions.followUserAsync.rejected, (state) => {
        state.status = "failed";
      })

      //Unfollow User Async
      .addCase(actions.unfollowUserAsync.pending, (state) => {
        state.followStatus = "loading";
      })
      .addCase(actions.unfollowUserAsync.fulfilled, (state, action) => {
        state.followStatus = "idle";
      })
      .addCase(actions.unfollowUserAsync.rejected, (state) => {
        state.followStatus = "failed";
      })
      
  },
});

export const { deleteUserNull } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.userData;
export const selectUserLoadingState = (state: RootState) => state.user.status;
export const selectFollowLoadingState = (state: RootState) => state.user.followStatus;

export default userSlice.reducer;
