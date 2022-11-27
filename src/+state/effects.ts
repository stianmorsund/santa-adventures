import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { CrashReason } from '../models/models'
import { addCloseOverlayListener } from '../utils/utils'
import {
  pressedCredits,
  pressedEscape,
  pressedPlaybutton,
  pressedRestartGame, santaCrashedOnPole,
  santaCrashedOnWall
} from './actions'
import { santaReducer } from './reducers'

const welcomeOverlay: HTMLElement = document.getElementById('welcome-overlay')
const gameoverOverlay: HTMLElement = document.getElementById('gameover-overlay')
const creditsOverlay: HTMLElement = document.getElementById('credits-overlay')

const showGameOverModal = (reason: CrashReason) => {
  const finalScoreElement: HTMLElement = document.getElementById('final-score')

  finalScoreElement.textContent = store.getState().score.toString()
  gameoverOverlay.style.display = 'flex'
}

const toggleCredits = () => {
  const newState = store.getState().isCreditsOpened ? 'flex' : 'none'
  creditsOverlay.style.display = newState
}

addCloseOverlayListener(creditsOverlay, toggleCredits)

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
  actionCreator: santaCrashedOnPole,
  effect: async (_action) => {
    showGameOverModal('pole')
  },
})

listenerMiddleware.startListening({
  actionCreator: santaCrashedOnWall,
  effect: async (_action) => {
    showGameOverModal('wall')
  },
})

listenerMiddleware.startListening({
  actionCreator: pressedRestartGame,
  effect: async (_action) => {
    window.location.reload()
  },
})

listenerMiddleware.startListening({
  actionCreator: pressedCredits,
  effect: async (_action) => {
    toggleCredits()
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
