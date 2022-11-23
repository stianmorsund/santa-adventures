import { POSSIBLE_X_POSITIONS } from '../models/models';

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

export const initialState: GameState = {
  currentLevel: 0,
  score: 0,
  isAlive: true,
  isGameFinished: false,
  diedReason: undefined,
  heroPosition: 0,
  isHeroJumping: false,
  isHeroCrawling: false,
};
