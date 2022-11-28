import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { CrashReason, SantaXPosition } from '../models/models'
import {
  assetsFailed,
  assetsFinishedLoading,
  assetsProgress,
  pressedCredits,
  pressedEscape,
  pressedPlaybutton,
  santaCollectedPackage,
  santaCrashedOnPole,
  santaCrashedOnWall,
  santaCrawled,
  santaJumped,
  santaLanded,
  santaMovedLeft,
  santaMovedRight,
  santaReachedFinishline
} from './actions'

interface GameState {
  santaPosition: SantaXPosition
  isJumping: boolean
  isCrawling: boolean
  isAlive: boolean
  isGameFinished: boolean
  isCreditsOpened: boolean
  isGamePaused: boolean
  score: number
  collectedPackages: string[]
  crashReason: CrashReason | undefined
  currentLevel: number
  isAssetsLoaded: boolean
  assetsProgress: { itemsLoaded: number; itemsTotal: number }
  isErrorLoadingAssets: boolean
  hasGameStarted: boolean
}

const initialState: GameState = {
  santaPosition: 0,
  isJumping: false,
  isCrawling: false,
  isAlive: true,
  isGamePaused: true,
  isGameFinished: false,
  isCreditsOpened: false,
  score: 0,
  collectedPackages: [],
  crashReason: undefined,
  currentLevel: 0,
  isAssetsLoaded: false,
  assetsProgress: { itemsLoaded: 0, itemsTotal: 0 },
  isErrorLoadingAssets: false,
  hasGameStarted: false,
}

export const santaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(santaMovedLeft, (state) => {
      state.santaPosition = state.santaPosition === 1 ? 0 : -1
    })
    .addCase(santaMovedRight, (state) => {
      state.santaPosition = state.santaPosition === -1 ? 0 : 1
    })
    .addCase(santaJumped, (state) => {
      state.isJumping = true
      state.isCrawling = false
    })
    .addCase(santaLanded, (state) => {
      state.isJumping = false
    })
    .addCase(santaCrawled, (state) => {
      state.isJumping = false
      state.isCrawling = true
    })
    .addCase(santaCollectedPackage, (state, action) => {
      state.score++
      state.collectedPackages.push(action.payload)
    })
    .addCase(santaReachedFinishline, (state, action) => {
      state.isGameFinished = true
      state.currentLevel++
    })
    .addCase(santaCrashedOnPole, (state, action) => {
      state.isAlive = false
      state.crashReason = 'pole'
    })
    .addCase(santaCrashedOnWall, (state, action) => {
      state.isAlive = false
      state.crashReason = 'wall'
    })
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
