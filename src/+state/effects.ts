import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { pressedPlaybutton, pressedRestartGame } from './actions'
import assetsSlice from './assets-slice'
import { gameReducer } from './reducers'
import santaReducer from './santa-slice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: pressedPlaybutton,
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
  reducer: { game: gameReducer, assets: assetsSlice, santa: santaReducer },
  devTools: true,
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
