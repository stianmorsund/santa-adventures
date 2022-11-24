import { configureStore, createAction, createListenerMiddleware, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Level1 } from '../levels/level1';
import { POSSIBLE_X_POSITIONS } from '../models/models';
import { listenerMiddleware } from './effects';
import { withPayloadType } from './utils';

interface GameState {
  level: number;
  score: number;
  isAlive: boolean;
  isGameFinished: boolean;
  diedReason: 'hinder' | 'pole' | undefined;
  heroPosition: POSSIBLE_X_POSITIONS;
  isJumping: boolean;
  isCrawling: boolean;
}

export const santaMovedLeft = createAction('Santa - Moved Left');
export const santaMovedRight = createAction('Santa - Moved Right');
export const santaJumped = createAction('Santa - Jumped');
export const santaCrawled = createAction('Santa - Crawled');
export const santaCollectedPackage = createAction('Santa - Collected package', withPayloadType<string>());
export const santaReachedFinishline = createAction('Santa - Reached finish line');

export const santaReducer = createReducer(
  {
    santaPosition: 0,
    isJumping: false,
    isCrawling: false,
    isAlive: true,
    isGameFinished: false,
    score: 0,
    collectedPackages: [],
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
      });
  }
);
