import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { santaCollectedPackage, santaReducer } from './reducers';

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: santaCollectedPackage,
  effect: async (action) => {
    console.log('EFFECT santaCollectedPackage');
  },
});

export const store = configureStore({
  reducer: santaReducer,
  devTools: true,
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
