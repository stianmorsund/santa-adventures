import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { store } from '../+state/store'
import { pressedRestartGame } from '../+state/ui-slice'
import { animations } from '../styles/animations.css'
import { buttons } from '../styles/buttons.css'
import { logo } from '../styles/logo.css'
import { overlays } from '../styles/overlay.css'

@customElement('sa-game-finished')
export class GameFinished extends LitElement {
  @property() isCurrentLevelFinished = false
  @property() score: number

  static styles = [
    animations,
    overlays,
    buttons,
    logo,
    css`
      .finished-text {
        font-family: 'Yanone Kaffeesatz', sans-serif;
        text-align: center;
        font-size: 3.3em;
        text-shadow: 0 2px 0 var(--color-dark-blue);
        line-height: 0.3em;
      }
      .flex {
        display: flex;
        align-items: center;
      }
      .gift {
        width: 60px;
        height: auto;
      }
    `,
  ]

  constructor() {
    super()
    store.subscribe(() => {
      const { isCurrentLevelFinished, score } = store.getState().santa
      if (isCurrentLevelFinished !== this.isCurrentLevelFinished) {
        this.isCurrentLevelFinished = isCurrentLevelFinished
        this.score = score
      }
    })
  }

  render() {
    return html`
      <div class="overlay ${this.isCurrentLevelFinished ? 'fade-in' : 'overlay--hidden'}">
        <div class="content">
          <img src="assets/logo.png" class="logo" alt="Santa Adventures" />
          <div class="finished-text">
            <h2>Gratulerer!</h2>
            <p class="flex">
              Du fikk <img class="gift" src="assets/gift.svg" aria-hidden="true" /> ${this.score} presanger
            </p>
          </div>
          <button class="btn" @click=${() => store.dispatch(pressedRestartGame())}>Spill igjen</button>
        </div>
      </div>
    `
  }
}
