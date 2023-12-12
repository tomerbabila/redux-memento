import React from 'react';
import './styles.css';
import CounterUseMemento from './components/CounterUseMemento';
import CounterMementoSlice from './components/CounterMementoSlice';

const App = () => {
  return (
    <div className='App'>
      <CounterUseMemento />
      <CounterMementoSlice />
    </div>
  );
};

export default App;
