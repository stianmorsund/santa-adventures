import {
  pressedCredits,
  pressedEscape,
  pressedPlaybutton,
  pressedRestartGame,
  santaCrawled,
  santaJumped,
  santaMovedLeft,
  santaMovedRight
} from '../+state/actions'
import { store } from '../+state/effects'

const playButton: HTMLElement = document.getElementById('btn-play')
const restartButton: HTMLElement = document.getElementById('btn-restart')

export class Controls {
  constructor() {
    document.onkeydown = (e) => this.handleKeyDown(e)
    playButton.addEventListener('click', () => store.dispatch(pressedPlaybutton()))
    restartButton.addEventListener('click', () => store.dispatch(pressedRestartGame()))
  }

  handleKeyDown(event: KeyboardEvent) {
    const { isCreditsOpened, isJumping, isCrawling, santaPosition } = store.getState()
    const { key } = event
    if (key === 'Escape') {
      if (isCreditsOpened) {
        store.dispatch(pressedCredits())
        return
      }
      store.dispatch(pressedEscape())
    }

    if (isJumping) return
    switch (key) {
      case 'a':
      case 'ArrowLeft':
        if (santaPosition === -1) return
        store.dispatch(santaMovedLeft())
        break
      case 'd':
      case 'ArrowRight':
        if (santaPosition === 1) return
        store.dispatch(santaMovedRight())
        break
      case ' ':
      case 'ArrowUp':
        store.dispatch(santaJumped())
        break
      case 's':
      case 'ArrowDown':
        if (isCrawling) return
        store.dispatch(santaCrawled())
        break
    }
  }
}
