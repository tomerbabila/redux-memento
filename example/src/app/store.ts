import { Store, configureStore } from '@reduxjs/toolkit';
import CounterReducer, { decrement, increment, setHistory } from '../features/counter/counterSlice';
import { mementoMiddleware } from 'redux-memento';

export const store: Store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(mementoMiddleware('counter', setHistory, [increment, decrement]).middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
