import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { increment, decrement, setHistory } from '../features/counter/counterSlice';
import { RootState } from '../app/store';

function mementoMiddleware(sliceName: keyof RootState) {
  const middleware = createListenerMiddleware();

  middleware.startListening({
    matcher: isAnyOf(increment, decrement),
    effect: (action, listenerApi) => {
      const currentState = listenerApi.getState() as RootState;

      const { data } = currentState[sliceName];

      listenerApi.dispatch(setHistory(data));
    },
  });

  return middleware;
}

export default mementoMiddleware;
