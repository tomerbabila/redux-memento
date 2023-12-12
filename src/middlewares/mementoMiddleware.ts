import { ActionCreatorWithoutPayload, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from '../types';

function mementoMiddleware(sliceName: keyof RootState, setHistory: any, matchers: ActionCreatorWithoutPayload[]) {
  const middleware = createListenerMiddleware();

  middleware.startListening({
    matcher: isAnyOf(...matchers),
    effect: (_, listenerApi) => {
      const currentState = listenerApi.getState() as RootState;

      const { data } = currentState[sliceName];

      listenerApi.dispatch(setHistory(data));
    },
  });

  return middleware;
}

export default mementoMiddleware;
