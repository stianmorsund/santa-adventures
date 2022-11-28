import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { pressedCredits, pressedEscape, pressedPlaybutton } from './actions'

interface GameState {
  isGameFinished: boolean
  isCreditsOpened: boolean
  isGamePaused: boolean
  hasGameStarted: boolean
}

const initialState: GameState = {
  isGamePaused: true,
  isGameFinished: false,
  isCreditsOpened: false,
  hasGameStarted: false,
}

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pressedCredits, (state, action) => {
      state.isCreditsOpened = !state.isCreditsOpened
    })

    .addCase(pressedPlaybutton, (state, action) => {
      state.hasGameStarted = true
    })
    .addMatcher(isAnyOf(pressedEscape, pressedPlaybutton), (state, action) => {
      state.isGamePaused = !state.isGamePaused
    })
})
