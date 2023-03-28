import { configureStore,  ThunkAction, Action } from '@reduxjs/toolkit'
import utilBoolsReducer from '../features/utilBools/utilBoolsSlice';
import * as userRedux from '../features/users';
import * as postRedux from '../features/posts';


export const store = configureStore({
  reducer: {
    user: userRedux.reducer.default,
    post: postRedux.reducer.default,
    utilBools: utilBoolsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


