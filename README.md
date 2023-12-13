### Redux Memento Library

[![npm version](https://badge.fury.io/js/redux-memento.svg)](https://badge.fury.io/js/redux-memento)

## Overview

Redux Memento is a library designed to simplify state management in Redux-toolkit applications by providing a mechanism for undo and redo functionality. This library integrates seamlessly with Redux-toolkit, allowing developers to create slices and middleware that support these time-traveling features.

## Installation

Using npm:

```bash
npm install redux-memento
```

Or via yarn:

```bash
yarn add redux-memento
```

## Usage

1. Define State and Reducers Types using `IMementoSlice`:

```typescript
import { PayloadAction } from '@reduxjs/toolkit';
import { IMementoSlice } from 'redux-memento';

// Your state interface
export interface ICounter {
  value: number;
}

// Types for `createMementoSlice`:
export type CounterState = IMementoSlice<ICounter>;
export type CounterReducers = {
  increment: (state: CounterState) => void;
  decrement: (state: CounterState) => void;
  incrementByAmount: (state: CounterState, action: PayloadAction<number>) => void;
};

// Init your state as usual
const initialState: ICounter = {
  value: 0,
};
```

2. Create a slice using `createMementoSlice` and utilize the types and interfaces you defined:

```typescript
import { createMementoSlice } from 'redux-memento';

// ...

// Use the types you initialized before when creating the memento slice
// Initialize the slice as usual
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
```

3. Create a middleware using `mementoMiddleware` and apply it in the store. Specify the slice name, `setHistory` action, and actions to track state changes:

```typescript
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
```

4. Now, easily travel history with `redo` and `undo`:

```typescript
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, undo, redo } from '../features/counter/counterSlice';

export default function CounterMementoSlice() {
  const count = useSelector(({ counter }) => counter.data);
  const dispatch = useDispatch();

  const increaseCount = () => {
    dispatch(increment());
  };

  const decreaseCount = () => {
    dispatch(decrement());
  };

  const undoCounter = () => {
    dispatch(undo());
  };

  const redoCounter = () => {
    dispatch(redo());
  };

  return (
    <div>
      <h2>Counter: {count.value}</h2>
      <p>Using Memento Slice</p>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
      <button onClick={undoCounter}>Undo</button>
      <button onClick={redoCounter}>Redo</button>
    </div>
  );
}
```

## How it works

You can read the read the story I went trough in **this article**

## Contributing

We welcome contributions!
Before you start, please take a moment to review the installation guideline.
After you finished your development, just make a PR.

## Installation

1. Clone your forked repository:

```bash
git clone https://github.com/tomerbabila/redux-memento.git
```

2. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

3. Install project dependencies:

```bash
npm ci
```

4. If you wish to run the example app, use this command before:

```bash
npm link ../node_modules/react
```

> This step is according to the first answer in [this stackoverflow](https://stackoverflow.com/questions/56663785/invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of-a-function-com)

5. make sure that everything is ok using this commands:

```bash
npm run prepare
npm run prepublishOnly
```
