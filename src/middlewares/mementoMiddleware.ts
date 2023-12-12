import { ActionCreatorWithoutPayload, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

function mementoMiddleware(sliceName: string, setHistory: any, matchers: ActionCreatorWithoutPayload[]) {
  const middleware = createListenerMiddleware();

  middleware.startListening({
    matcher: isAnyOf(...matchers),
    effect: (_, listenerApi) => {
      const currentState: any = listenerApi.getState();

      const { data } = currentState[sliceName] as any;

      listenerApi.dispatch(setHistory(data));
    },
  });

  return middleware;
}

export default mementoMiddleware;
