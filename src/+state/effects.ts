import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import assetsSlice from './assets-slice'
import santaReducer from './santa-slice'
import uiSlice, { pressedPlay, pressedRestartGame } from './ui-slice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: pressedPlay,
  effect: async (_action) => {
    document.body.classList.add('game-started')
  },
})

listenerMiddleware.startListening({
  actionCreator: pressedRestartGame,
  effect: async (_action) => {
    window.location.reload()
  },
})

export const store = configureStore({
  reducer: { ui: uiSlice, assets: assetsSlice, santa: santaReducer },
  devTools: true,
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
