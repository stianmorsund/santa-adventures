import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { store } from '../+state/store'
import { pressedRestartGame } from '../+state/ui-slice'
import { CrashReason } from '../models/models'
import { animations } from '../styles/animations.css'
import { buttons } from '../styles/buttons.css'
import { logo } from '../styles/logo.css'
import { overlays } from '../styles/overlay.css'

@customElement('sa-game-over')
export class GameOver extends LitElement {
  @property() isAlive = true
  @property() score: number
  @property() crashReason: CrashReason

  static styles = [
    animations,
    overlays,
    buttons,
    logo,
    css`
      .gameover-text {
        font-family: 'Yanone Kaffeesatz', sans-serif;
        text-align: center;
        font-size: 3.3em;
        text-shadow: 0 2px 0 var(--color-dark-blue);
        line-height: 0.3em;
        max-width: 500px;
      }
      .tips {
        font-size: 0.7em;
        font-family: 'Crimson Text';
        line-height: 1.2em;
      }
    `,
  ]

  constructor() {
    super()
    store.subscribe(() => {
      const { isAlive, crashReason, score } = store.getState().santa
      if (isAlive !== this.isAlive) {
        this.isAlive = isAlive
        this.crashReason = crashReason
        this.score = score
      }
    })
  }

  render() {
    return html`
      <div class="overlay ${this.isAlive ? 'overlay--hidden' : ''}">
        <div class="content">
          <img src="assets/logo.png" class="logo" alt="Santa Adventures" />
          <div class="gameover-text">
            <h2>Game over!</h2>
            <p>Du fikk ${this.score} presang${this.score === 1 ? '' : 'er'}.</p>
            <p class="tips">
              Tips!
              ${(() => {
                if (this.crashReason === 'wall') {
                  return html`Trykk <kbd>Space</kbd> for å hoppe over veggene`
                }
                if (this.crashReason === 'pole') {
                  return html`Trykk <kbd>&darr;</kbd> for å dukke under stolpene`
                }
              })()}
            </p>
          </div>
          <button class="btn" @click=${() => store.dispatch(pressedRestartGame())}>Spill igjen</button>
        </div>
      </div>
    `
  }
}
