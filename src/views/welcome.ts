import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { pressedPlaybutton } from '../+state/actions'
import { store } from '../+state/effects'
import { animations } from '../styles/animations.css'
import { buttons } from '../styles/buttons.css'
import { logo } from '../styles/logo.css'
import { overlays } from '../styles/overlay.css'
import './progress-bar'

@customElement('sa-welcome')
export class Welcome extends LitElement {
  @property() isGamePaused = false
  @property() isAssetsLoaded = false
  @property() isErrorLoadingAssets = false

  static styles = [
    animations,
    overlays,
    buttons,
    logo,
    css`
      .intro-text {
        font-size: 1.9em;
        text-align: center;
        font-weight: 400;
        line-height: 1.3em;
        text-shadow: 0 2px 0 var(--color-dark-blue);
      }

      .intro-text__error {
        color: #fff;
        text-shadow: 0 2px 0 var(--color-red);
        border: 1px solid var(--color-red);
        background: var(--color-red);
        border-radius: 10px;
        padding: 0.7em;
      }

      sa-progress-bar {
        width: 100%;
      }
    `,
  ]

  constructor() {
    super()
    store.subscribe(() => {
      const { isAlive, isGamePaused, isAssetsLoaded, isErrorLoadingAssets } = store.getState()
      if (!isAlive) return
      this.isErrorLoadingAssets = isErrorLoadingAssets
      this.isAssetsLoaded = isAssetsLoaded

      if (isGamePaused !== this.isGamePaused) {
        this.isGamePaused = isGamePaused
      }
    })
  }

  play() {
    store.dispatch(pressedPlaybutton())
  }

  render() {
    return html`
      <div class="overlay ${!this.isGamePaused ? 'hidden' : ''}">
        <div class="content ">
          <img src="assets/logo.png" class="logo" alt="Santa Adventures" />
          <sa-progress-bar></sa-progress-bar>
          <p class="intro-text">
            Hjelp nissen med å samle alle presangene, men pass deg for hinderne! Bruk piltastene for å styre. Trykk
            <kbd>Esc</kbd> for å pause spillet.
          </p>

          <p class="intro-text ${!this.isErrorLoadingAssets ? 'hidden' : ''} intro-text__error">
            Det skjedde en feil under lasting av spillet. Prøv å laste siden på nytt.
          </p>
          <button class="btn animated pulse ${!this.isAssetsLoaded ? 'hidden' : ''}" @click=${this.play}>Spill</button>
          <sa-credits></sa-credits>
        </div>
      </div>
    `
  }
}
