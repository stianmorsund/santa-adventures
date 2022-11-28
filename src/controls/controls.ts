import * as santa from '../+state/santa-slice'
import { store } from '../+state/store'
import { pressedCredits, pressedEscape } from '../+state/ui-slice'

export class Controls {
  constructor() {
    document.onkeydown = (e) => this.handleKeyDown(e)
  }

  handleKeyDown(event: KeyboardEvent) {
    const { isJumping, isCrawling, santaPosition } = store.getState().santa
    const { isCreditsOpened } = store.getState().ui
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
        store.dispatch(santa.movedLeft())
        break
      case 'd':
      case 'ArrowRight':
        if (santaPosition === 1) return
        store.dispatch(santa.movedRight())
        break
      case ' ':
      case 'ArrowUp':
        store.dispatch(santa.jumped())
        break
      case 's':
      case 'ArrowDown':
        if (isCrawling) return
        store.dispatch(santa.crawled())
        break
    }
  }
}
