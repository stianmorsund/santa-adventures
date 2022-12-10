import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CrashReason, SantaXPosition } from '../models/models'
import { pressedRestartGame } from './ui-slice'

interface SantaState {
  santaXPosition: SantaXPosition
  isJumping: boolean
  isCrawling: boolean
  isAlive: boolean
  collectedPackages: string[]
  crashReason: CrashReason | undefined
  score: number
  currentLevel: number
  isCurrentLevelFinished: boolean
}

const initialState = {
  santaXPosition: 0,
  isJumping: false,
  isCrawling: false,
  isAlive: true,
  collectedPackages: [],
  crashReason: undefined,
  score: 0,
  currentLevel: 0,
  isCurrentLevelFinished: false,
} as SantaState

const santaSlice = createSlice({
  name: 'santa',
  initialState,
  reducers: {
    movedLeft: (state) => {
      state.santaXPosition = state.santaXPosition === 1 ? 0 : -1
    },
    movedRight: (state) => {
      state.santaXPosition = state.santaXPosition === -1 ? 0 : 1
    },
    jumped: (state) => {
      state.isJumping = true
      state.isCrawling = false
    },
    landed: (state) => {
      state.isJumping = false
    },
    crawled: (state) => {
      state.isJumping = false
      state.isCrawling = true
    },
    collectedPackage: (state, action: PayloadAction<string>) => {
      state.score++
      state.collectedPackages.push(action.payload)
    },
    reachedFinishline: (state) => {
      state.isCurrentLevelFinished = true
      state.currentLevel++
    },
    crashedOnPole: (state) => {
      state.isAlive = false
      state.crashReason = 'pole'
    },
    crashedOnWall: (state) => {
      state.isAlive = false
      state.crashReason = 'wall'
    },
  },
  extraReducers: (builder) => builder.addCase(pressedRestartGame, () => initialState),
})

export const {
  movedLeft,
  movedRight,
  jumped,
  landed,
  crawled,
  collectedPackage,
  crashedOnPole,
  crashedOnWall,
  reachedFinishline,
} = santaSlice.actions
export default santaSlice.reducer
