import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface utilBoolsState {
  isSideBarOpen: boolean
  isPostModalOpen: boolean
}

const initialState: utilBoolsState = {
  isSideBarOpen: false,
  isPostModalOpen: false,
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
    },
  });
  
  export const { setIsSideBarOpen, setIsPostModalOpen } = utilBoolsSlice.actions;

  export const selectIsSideBarOpen = (state: RootState) => state.utilBools.isSideBarOpen;
  export const selectIsPostModalOpen = (state: RootState) => state.utilBools.isPostModalOpen;
  
  export default utilBoolsSlice.reducer;