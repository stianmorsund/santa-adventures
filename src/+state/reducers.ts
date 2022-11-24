import { createAction, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { POSSIBLE_X_POSITIONS } from '../models/models';
import { withPayloadType } from './utils';

export const santaMovedLeft = createAction('Santa - Moved Left');
export const santaMovedRight = createAction('Santa - Moved Right');
export const santaJumped = createAction('Santa - Jumped');
export const santaCrawled = createAction('Santa - Crawled');
export const santaCollectedPackage = createAction('Santa - Collected package', withPayloadType<string>());
export const santaReachedFinishline = createAction('Santa - Reached finish line');

export const pressedPlaybutton = createAction('Pressed Play');
export const pressedEscape = createAction('Pressed Escape');

interface GameState {
  // level: number;
  santaPosition: POSSIBLE_X_POSITIONS;
  isJumping: boolean;
  isCrawling: boolean;
  isAlive: boolean;
  isGameFinished: boolean;
  isGamePaused: boolean;
  score: number;
  collectedPackages: string[];
  diedReason: 'hinder' | 'pole' | undefined;
}

const initialState: GameState = {
  santaPosition: 0,
  isJumping: false,
  isCrawling: false,
  isAlive: true,
  isGamePaused: true,
  isGameFinished: false,
  score: 0,
  collectedPackages: [],
  diedReason: undefined,
};

export const santaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(santaMovedLeft, (state) => {
      state.santaPosition = state.santaPosition === 1 ? 0 : -1;
    })
    .addCase(santaMovedRight, (state) => {
      state.santaPosition = state.santaPosition === -1 ? 0 : 1;
    })
    .addCase(santaJumped, (state) => {
      state.isJumping = true;
      state.isCrawling = false;
    })
    .addCase(santaCrawled, (state) => {
      state.isJumping = false;
      state.isCrawling = true;
    })
    .addCase(santaCollectedPackage, (state, action) => {
      state.score++;
      state.collectedPackages.push(action.payload);
    })
    .addCase(santaReachedFinishline, (state, action) => {
      state.isGameFinished = true;
    })
    .addMatcher(isAnyOf(pressedEscape, pressedPlaybutton), (state, action) => {
      state.isGamePaused = !state.isGamePaused;
    });
});
