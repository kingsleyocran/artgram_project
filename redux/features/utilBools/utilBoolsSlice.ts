import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import postDataModel from "../../../models/postDataModel"
export interface utilBoolsState {
  isSideBarOpen: boolean 
  isPostModalOpen: boolean 
  postEditData: postDataModel | null
}

const initialState: utilBoolsState = {
  isSideBarOpen: false,
  isPostModalOpen: false,
  postEditData: null,
};

export const utilBoolsSlice = createSlice({
    name: 'utilBools',
    initialState,
    reducers: {
      setIsSideBarOpen: (state, action: any) => {
        state.isSideBarOpen = action.payload;
      },
      setIsPostModalOpen: (state, action: any) => {
        state.isPostModalOpen = action.payload;
      },
      setPostEditData: (state, action: any) => {
        state.postEditData = action.payload;
      },
    },
  });
  
  export const { setIsSideBarOpen, setIsPostModalOpen, setPostEditData } = utilBoolsSlice.actions;

  export const selectIsSideBarOpen = (state: RootState) => state.utilBools.isSideBarOpen;
  export const selectIsPostModalOpen = (state: RootState) => state.utilBools.isPostModalOpen;
  export const selectPostEditData = (state: RootState) => state.utilBools.postEditData;
  
  export default utilBoolsSlice.reducer;