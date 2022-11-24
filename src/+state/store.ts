import { configureStore, createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { POSSIBLE_X_POSITIONS } from '../models/models';
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
export const santaReachedFinishline = createAction('Santa - Reached finish line');

const counter = createReducer(
  { santaPosition: 0, isJumping: false, isCrawling: false },
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
  }
);

export const store = configureStore({
  reducer: counter,
  devTools: true,
});
