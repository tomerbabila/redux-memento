import React from 'react';
import { useMemento } from '../../../src/hooks';

const CounterUseMemento = () => {
  const [count, setCount, { undo, redo }] = useMemento<number>(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <p>Using useMemento</p>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default CounterUseMemento;
