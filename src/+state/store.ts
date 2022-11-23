import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
const increment = createAction("increment");
const decrement = createAction("decrement");

const counter = createReducer(0, {
  [increment.type]: state => state + 1,
  [decrement.type]: state => state - 1
});

export const store = configureStore({
  reducer: counter,
  devTools: true
})