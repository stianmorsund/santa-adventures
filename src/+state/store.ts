import { configureStore } from '@reduxjs/toolkit'
import assetsSlice from './assets-slice'
import { listenerMiddleware } from './effects'
import santaReducer from './santa-slice'
import uiSlice from './ui-slice'

export const store = configureStore({
  reducer: { ui: uiSlice, assets: assetsSlice, santa: santaReducer },
  devTools: true,
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
