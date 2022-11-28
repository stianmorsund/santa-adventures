import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { pressedRestartGame } from '../+state/actions'
import { store } from '../+state/effects'
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
            <p>Du fikk ${this.score} presanger</p>
          </div>
          <button class="btn" @click=${() => store.dispatch(pressedRestartGame())}>Spill igjen</button>
        </div>
      </div>
    `
  }
}
