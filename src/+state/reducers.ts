import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import {
  assetsFailed,
  assetsFinishedLoading,
  assetsProgress,
  pressedCredits,
  pressedEscape,
  pressedPlaybutton
} from './actions'

interface GameState {
  isGameFinished: boolean
  isCreditsOpened: boolean
  isGamePaused: boolean
  hasGameStarted: boolean
  isAssetsLoaded: boolean
  assetsProgress: { itemsLoaded: number; itemsTotal: number }
  isErrorLoadingAssets: boolean
}

const initialState: GameState = {
  isGamePaused: true,
  isGameFinished: false,
  isCreditsOpened: false,
  isAssetsLoaded: false,
  assetsProgress: { itemsLoaded: 0, itemsTotal: 0 },
  isErrorLoadingAssets: false,
  hasGameStarted: false,
}

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pressedCredits, (state, action) => {
      state.isCreditsOpened = !state.isCreditsOpened
    })
    .addCase(assetsFinishedLoading, (state, action) => {
      state.isAssetsLoaded = true
    })
    .addCase(assetsFailed, (state, action) => {
      state.isErrorLoadingAssets = true
    })
    .addCase(assetsProgress, (state, action) => {
      state.assetsProgress = action.payload
    })
    .addCase(pressedPlaybutton, (state, action) => {
      state.hasGameStarted = true
    })
    .addMatcher(isAnyOf(pressedEscape, pressedPlaybutton), (state, action) => {
      state.isGamePaused = !state.isGamePaused
    })
})
