import { createSlice, SliceCaseReducers, ValidateSliceCaseReducers, PayloadAction, Draft } from '@reduxjs/toolkit';
import { IMementoSlice } from '../types';

const createMementoSlice = <T, Reducers extends SliceCaseReducers<IMementoSlice<T>>>({
  name = '',
  initialState,
  reducers,
}: {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<IMementoSlice<T>, Reducers>;
}) => {
  const mementoSlice = createSlice({
    name,
    initialState: {
      history: [initialState],
      currentHistoryIndex: 0,
      data: initialState,
    },
    reducers: {
      undo: (state) => {
        const prevIndex = state.currentHistoryIndex - 1;
        if (prevIndex >= 0) {
          state.currentHistoryIndex = prevIndex;
          state.data = { ...state.history[prevIndex] };
        }
      },
      redo: (state) => {
        const nextIndex = state.currentHistoryIndex + 1;
        if (nextIndex < state.history.length) {
          state.currentHistoryIndex = nextIndex;
          state.data = { ...state.history[nextIndex] };
        }
      },
      setHistory: (state, action: PayloadAction<T>) => {
        const prevHistory = state.history;
        state.history = [...prevHistory.slice(0, state.currentHistoryIndex + 1), action.payload] as Draft<T>[];
        state.currentHistoryIndex = state.currentHistoryIndex + 1;
      },
      ...reducers,
    },
  });

  return mementoSlice;
};

export default createMementoSlice;
