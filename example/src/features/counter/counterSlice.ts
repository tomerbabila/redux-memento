import { PayloadAction } from '@reduxjs/toolkit';
import { createMementoSlice, IMementoSlice } from 'redux-memento';

export interface ICounter {
  value: number;
}

export type CounterState = IMementoSlice<ICounter>;
export type CounterReducers = {
  increment: (state: CounterState) => void;
  decrement: (state: CounterState) => void;
  incrementByAmount: (state: CounterState, action: PayloadAction<number>) => void;
};

const initialState: ICounter = {
  value: 0,
};

export const counterSlice = createMementoSlice<ICounter, CounterReducers>({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.data.value += 1;
    },
    decrement: (state: CounterState) => {
      state.data.value -= 1;
    },
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.data.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, redo, undo, setHistory } = counterSlice.actions;

export default counterSlice.reducer;
