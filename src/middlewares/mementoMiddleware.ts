import {
  ActionCreatorWithoutPayload,
  Store,
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';

const store: Store = configureStore({ reducer: {} });
export type RootState = ReturnType<typeof store.getState>;

function mementoMiddleware(sliceName: keyof RootState, setHistory: any, matchers: ActionCreatorWithoutPayload[]) {
  const middleware = createListenerMiddleware();

  middleware.startListening({
    matcher: isAnyOf(...matchers),
    effect: (action, listenerApi) => {
      const currentState = listenerApi.getState() as RootState;

      const { data } = currentState[sliceName];

      listenerApi.dispatch(setHistory(data));
    },
  });

  return middleware;
}

export default mementoMiddleware;
