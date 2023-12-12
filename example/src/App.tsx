import React from 'react';
import CounterUseMemento from './components/CounterUseMemento';
import CounterMementoSlice from './components/CounterMementoSlice';

const App = () => {
  return (
    <div className='app'>
      <CounterUseMemento />
      <CounterMementoSlice />
    </div>
  );
};

export default App;
