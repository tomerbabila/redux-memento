import React from 'react';
import CounterUseMemento from './components/CounterUseMemento';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <CounterUseMemento />
      </div>
    </Provider>
  );
};

export default App;
