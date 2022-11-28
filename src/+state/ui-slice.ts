import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  isCreditsOpened: boolean
  isGamePaused: boolean
  hasGameStarted: boolean
}

const initialState = {
  isGamePaused: true, 
  isCreditsOpened: false,
  hasGameStarted: false,
} as UIState

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pressedCredits: (state) => {
      state.isCreditsOpened = !state.isCreditsOpened
    },
    pressedPlay: (state) => {
      state.hasGameStarted = true
      state.isGamePaused = !state.isGamePaused
    },
    pressedEscape: (state) => {
      state.isGamePaused = !state.isGamePaused
    },
    pressedRestartGame: () => {},
  },
})

export const { pressedCredits, pressedEscape, pressedPlay, pressedRestartGame } = uiSlice.actions
export default uiSlice.reducer
