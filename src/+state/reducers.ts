import { configureStore, createAction, createListenerMiddleware, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { POSSIBLE_X_POSITIONS } from '../models/models';
import { listenerMiddleware } from './effects';
import { withPayloadType } from './utils';

interface GameState {
  currentLevel: number;
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
export const santaCollectedPackage = createAction('Santa - Collected package');
export const santaReachedFinishline = createAction('Santa - Reached finish line');

export const santaReducer = createReducer(
  { santaPosition: 0, isJumping: false, isCrawling: false, score: 0 },
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
    [santaCollectedPackage.type]: (state) => ({
      ...state,
      score: state.score + 1,
    }),
  }
);


