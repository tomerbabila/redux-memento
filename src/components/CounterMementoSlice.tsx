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
