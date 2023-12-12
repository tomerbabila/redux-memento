export interface IMementoSlice<T> {
  data: T;
  history: T[];
  currentHistoryIndex: number;
}
