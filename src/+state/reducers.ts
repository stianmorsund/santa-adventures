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
  {
    [santaMovedLeft.type]: (state) => ({
      ...state,
      santaPosition: state.santaPosition === 1 ? 0 : -1,
    }),
    [santaMovedRight.type]: (state) => ({
      ...state,
      santaPosition: state.santaPosition === -1 ? 0 : 1,
    }),
    [santaJumped.type]: (state) => ({
      ...state,
      isJumping: true,
      isCrawling: false,
    }),
    [santaCrawled.type]: (state) => ({
      ...state,
      isCrawling: true,
      isJumping: false,
    }),
    [santaCollectedPackage.type]: (state, action) => ({
      ...state,
      score: state.score + 1,
      collectedPackages: [...state.collectedPackages, action.payload],
    }),
  }
);
