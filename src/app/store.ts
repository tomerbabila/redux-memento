import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from '../features/counter/counterSlice';
import mementoMiddleware from '../middlewares/mementoMiddleware';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(mementoMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
