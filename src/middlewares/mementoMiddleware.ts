import { ActionCreatorWithoutPayload, configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

type StoreType = ReturnType<typeof configureStore>;
type RootState = ReturnType<StoreType['getState']>;

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
