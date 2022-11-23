import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
export const increment = createAction('increment');
export const decrement = createAction('decrement');

const counter = createReducer(0, {
  [increment.type]: (state) => state + 1,
  [decrement.type]: (state) => state - 1,
});

export const store = configureStore({
  reducer: counter,
  devTools: true,
});
