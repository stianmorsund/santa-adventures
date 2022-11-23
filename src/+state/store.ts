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
  isHeroJumping: boolean;
  isHeroCrawling: boolean;
}

export const santaMovedLeft = createAction('Santa Moved Left');
export const santaMovedRight = createAction('Santa Moved Right');
export const santaJumped = createAction('Santa Jumped');

export const increment = createAction('increment');
export const decrement = createAction('decrement');

const counter = createReducer(
  { santaPosition: 0 },
  {
    [santaMovedLeft.type]: (state) => ({
      ...state,
      santaPosition: state.santaPosition === 1 ? 0 : -1,
    }),
  }
);

export const store = configureStore({
  reducer: counter,
  devTools: true,
});
