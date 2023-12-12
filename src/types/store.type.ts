import { configureStore } from '@reduxjs/toolkit';

type StoreType = ReturnType<typeof configureStore>;
export type RootState = ReturnType<StoreType['getState']>;
