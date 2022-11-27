import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { pressedEscape, pressedPlaybutton, pressedRestartGame } from './actions'
import { santaReducer } from './reducers'

const welcomeOverlay: HTMLElement = document.getElementById('welcome-overlay')

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: pressedPlaybutton,
  effect: async (_action) => {
    document.body.classList.add('game-started')
    welcomeOverlay.style.display = 'none'
  },
})

listenerMiddleware.startListening({
  actionCreator: pressedEscape,
  effect: async (_action) => {
    if (!store.getState().isAlive) return
    const { display } = welcomeOverlay.style
    welcomeOverlay.style.display = display === 'none' ? 'flex' : 'none'
  },
})

listenerMiddleware.startListening({
  actionCreator: pressedRestartGame,
  effect: async (_action) => {
    window.location.reload()
  },
})

export const store = configureStore({
  reducer: santaReducer,
  devTools: true,
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
