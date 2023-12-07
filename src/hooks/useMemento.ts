import { useCallback, useState } from 'react';

export const useMemento = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([initialState]);
  const [index, setIndex] = useState<number>(0);

  const setAndSaveState = useCallback(
    (newState: T) => {
      setHistory((prevHistory) => [...prevHistory.slice(0, index + 1), newState]);
      setIndex((prevIndex) => prevIndex + 1);
      setState(newState);
    },
    [index],
  );

  const undo = useCallback(() => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setState(history[newIndex]);
    }
  }, [index, history]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setState(history[newIndex]);
    }
  }, [index, history]);

  return [state, setAndSaveState, { undo, redo }] as const;
};
