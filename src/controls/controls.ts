import * as santa from '../+state/santa-slice'
import { store } from '../+state/store'
import { pressedCredits, pressedEscape } from '../+state/ui-slice'

export function addControls() {
  document.onkeydown = (e) => handleKeyDown(e)
}

function handleKeyDown(event: KeyboardEvent) {
  const { isJumping, isCrawling, santaXPosition, isCurrentLevelFinished } = store.getState().santa
  const { isCreditsOpened, hasGameStarted } = store.getState().ui
  const { key } = event

  if (isCurrentLevelFinished) return

  if (key === 'Escape') {
    if (isCreditsOpened) {
      store.dispatch(pressedCredits())
      return
    }
    store.dispatch(pressedEscape())
  }

  if (!hasGameStarted || isJumping) return
  switch (key) {
    case 'a':
    case 'ArrowLeft':
      if (santaXPosition === -1) return
      store.dispatch(santa.movedLeft())
      break
    case 'd':
    case 'ArrowRight':
      if (santaXPosition === 1) return
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
