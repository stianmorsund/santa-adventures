import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CrashReason, SantaXPosition } from '../models/models'

interface SantaState {
  santaPosition: SantaXPosition
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
  santaPosition: 0,
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
      state.santaPosition = state.santaPosition === 1 ? 0 : -1
    },
    movedRight: (state) => {
      state.santaPosition = state.santaPosition === -1 ? 0 : 1
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
