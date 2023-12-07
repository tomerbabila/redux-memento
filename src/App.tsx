import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';

import CounterUseMemento from './components/CounterUseMemento';
import CounterMementoSlice from './components/CounterMementoSlice';

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <CounterUseMemento />
        <CounterMementoSlice />
      </div>
    </Provider>
  );
};

export default App;
