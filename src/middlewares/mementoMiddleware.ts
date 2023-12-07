import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { increment, decrement, setHistory } from '../features/counter/counterSlice';
import { RootState } from '../app/store';

const mementoMiddleware = createListenerMiddleware();

// TODO: make more generic
mementoMiddleware.startListening({
  matcher: isAnyOf(increment, decrement),
  effect: (action, listenerApi) => {
    const currentState = listenerApi.getState() as RootState;

    // TODO: replace "counter" with name from function
    const { data } = currentState['counter'];

    listenerApi.dispatch(setHistory(data));
  },
});

export default mementoMiddleware;
