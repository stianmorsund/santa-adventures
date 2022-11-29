import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { Camera } from '../camera/camera'
import assetsSlice from './assets-slice'
import santaReducer, { reachedFinishline } from './santa-slice'
import uiSlice, { pressedPlay, pressedRestartGame } from './ui-slice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: pressedPlay,
  effect: async (_action) => {
    // Show ccanvas when starting game
    document.getElementsByTagName('canvas')[0].style.display = 'block'
    document.body.classList.add('game-started')
  },
})

listenerMiddleware.startListening({
  actionCreator: pressedRestartGame,
  effect: async (_action) => {
    window.location.reload()
  },
})

listenerMiddleware.startListening({
  actionCreator: reachedFinishline,
  effect: async (_action) => {
    Camera.getInstance().setRotation({ x: -0.15, y: Math.PI, z: 0 }).setPosition({ x: 0, y: 1.2, z: -0.8 })
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
