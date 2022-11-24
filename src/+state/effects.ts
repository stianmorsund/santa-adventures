import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { santaCollectedPackage, santaReducer } from './reducers';

const updateScore = () => {
  const scoreElement: HTMLElement = document.getElementById('score');
  scoreElement.classList.add('pulse');
  scoreElement.textContent = store.getState().score.toString();

  setTimeout(() => {
    scoreElement.classList.remove('pulse');
  }, 1000);
};

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: santaCollectedPackage,
  effect: async (_action) => {
    updateScore();
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
