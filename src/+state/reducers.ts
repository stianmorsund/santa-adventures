import { createAction, createReducer } from '@reduxjs/toolkit';
import { POSSIBLE_X_POSITIONS } from '../models/models';
import { withPayloadType } from './utils';

export const santaMovedLeft = createAction('Santa - Moved Left');
export const santaMovedRight = createAction('Santa - Moved Right');
export const santaJumped = createAction('Santa - Jumped');
export const santaCrawled = createAction('Santa - Crawled');
export const santaCollectedPackage = createAction('Santa - Collected package', withPayloadType<string>());
export const santaReachedFinishline = createAction('Santa - Reached finish line');

interface GameState {
  // level: number;
  santaPosition: POSSIBLE_X_POSITIONS;
  isJumping: boolean;
  isCrawling: boolean;
  isAlive: boolean;
  isGameFinished: boolean;
  score: number;
  collectedPackages: string[];
  diedReason: 'hinder' | 'pole' | undefined;
}

export const santaReducer = createReducer(
  <GameState>{
    santaPosition: 0,
    isJumping: false,
    isCrawling: false,
    isAlive: true,
    isGameFinished: false,
    score: 0,
    collectedPackages: [],
    diedReason: undefined,
  },
  (builder) => {
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
      });
  }
);
