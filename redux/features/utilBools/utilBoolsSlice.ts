import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface utilBoolsState {
  isEmbedVisible: boolean
  isLoggedIn: boolean
}

const initialState: utilBoolsState = {
  isEmbedVisible: false,
  isLoggedIn: false,
};

export const utilBoolsSlice = createSlice({
    name: 'utilBools',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setIsEmbedVisible: (state, action: any) => {
        state.isEmbedVisible = action.payload;
      },
      setIsLoggedIn: (state, action: any) => {
        state.isLoggedIn = action.payload;
      },
    },
  });
  
  export const { setIsEmbedVisible, setIsLoggedIn } = utilBoolsSlice.actions;
  
  // The function below is called a selector and allows us to select a value from
  // the state. Selectors can also be defined inline where they're used instead of
  // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
  export const selectIsEmbedVisible = (state: RootState) => state.utilBools.isEmbedVisible;
  export const selectIsLoggedIn = (state: RootState) => state.utilBools.isLoggedIn;
  
  
  export default utilBoolsSlice.reducer;