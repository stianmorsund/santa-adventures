import { store } from '../+state/effects';
import {
  pressedEscape,
  pressedPlaybutton,
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
    creditsButton.addEventListener('click', () => this.toggleCredits());
    restartButton.addEventListener('click', () => this.restartGame());
    creditsCloseBtn.addEventListener('click', () => this.toggleCredits());
    addCloseOverlayListener(creditsModal, this.toggleCredits);

    // const unsubscribe = store.subscribe(this.render);
    // unsubscribe();
  }

  handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (key === 'Escape') {
      if (this.isCreditsOpened()) {
        this.toggleCredits('hide');
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

  render() {}

  isCreditsOpened = () => creditsModal.style.display === 'flex';

  toggleCredits(newState?: 'show' | 'hide') {
    const { display } = creditsModal.style;
    if (newState === 'show') {
      creditsModal.style.display = 'flex';
      return;
    }
    if (newState == 'hide') {
      creditsModal.style.display = 'none';
      return;
    }
    creditsModal.style.display = display === 'none' || display === '' ? 'flex' : 'none';
  }

  restartGame() {
    window.location.reload();
  }
}
