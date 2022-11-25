import { store } from '../+state/effects';
import {
  pressedCredits,
  pressedEscape,
  pressedPlaybutton,
  pressedRestartGame,
  santaCrawled,
  santaJumped,
  santaMovedLeft,
  santaMovedRight,
} from '../+state/actions';
import { addCloseOverlayListener } from '../utils/utils';

const creditsModal: HTMLElement = document.getElementById('credits-modal');
const playButton: HTMLElement = document.getElementById('btn-play');
const creditsButton: HTMLElement = document.getElementById('btn-credits');
const restartButton: HTMLElement = document.getElementById('btn-restart');
const creditsCloseBtn: HTMLElement = document.getElementById('btn-credits-close');

export class Controls {
  constructor() {
    document.onkeydown = (e) => this.handleKeyDown(e);
    playButton.addEventListener('click', () => store.dispatch(pressedPlaybutton()));
    creditsButton.addEventListener('click', () => store.dispatch(pressedCredits()));
    restartButton.addEventListener('click', () => store.dispatch(pressedRestartGame()));
    creditsCloseBtn.addEventListener('click', () => store.dispatch(pressedCredits()));
  }

  handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (key === 'Escape') {
      if (store.getState().isCreditsOpened) {
        store.dispatch(pressedCredits());
        return;
      }
      store.dispatch(pressedEscape());
    }

    if (store.getState().isJumping) return;
    switch (key) {
      case 'a':
      case 'ArrowLeft':
        store.dispatch(santaMovedLeft());
        break;
      case 'd':
      case 'ArrowRight':
        store.dispatch(santaMovedRight());
        break;
      case ' ':
      case 'ArrowUp':
        store.dispatch(santaJumped());
        break;
      case 's':
      case 'ArrowDown':
        store.dispatch(santaCrawled());
        break;
    }
  }
}
