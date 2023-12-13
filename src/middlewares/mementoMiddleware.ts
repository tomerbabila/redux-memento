import { ActionCreatorWithoutPayload, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

function mementoMiddleware<R extends Record<string, any>>(
  sliceName: keyof R,
  setHistory: any,
  matchers: ActionCreatorWithoutPayload[],
) {
  const middleware = createListenerMiddleware();

  middleware.startListening({
    matcher: isAnyOf(...matchers),
    effect: (_, listenerApi) => {
      const currentState = listenerApi.getState() as R;

      const { data } = currentState[sliceName];

      listenerApi.dispatch(setHistory(data));
    },
  });

  return middleware;
}

export default mementoMiddleware;
