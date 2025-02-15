import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { store } from '../+state/store'
import { pressedCredits } from '../+state/ui-slice'
import { animations } from '../styles/animations.css'
import { buttons } from '../styles/buttons.css'
import { overlays } from '../styles/overlay.css'

@customElement('sa-credits')
export class Credits extends LitElement {
  @property() isOpened = false
  @query('#credits-modal') modal: HTMLElement

  static styles = [
    animations,
    overlays,
    buttons,
    css`
      .credits-list {
        font-size: 1.5em;
      }
    `,
  ]

  constructor() {
    super()
    store.subscribe(() => {
      const { isCreditsOpened } = store.getState().ui
      if (isCreditsOpened !== this.isOpened) {
        this.isOpened = isCreditsOpened
      }
    })
  }

  shouldToggle(target: any) {
    return !this.modal.contains(target)
  }

  toggle(e: Event) {
    if (this.shouldToggle(e.target)) {
      store.dispatch(pressedCredits())
    }
  }

  render() {
    return html`
      <button class="btn-credits" @click=${this.toggle}>Credits</button>
      <div class="overlay ${!this.isOpened ? 'overlay--hidden' : ''}" @click=${this.toggle}>
        <div class="modal content" id="credits-modal">
          <h2>Credits</h2>

          <ul class="credits-list">
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.turbosquid.com/3d-models/cartoony-santa-3ds/698877"
                >Santa</a
              >
            </li>

            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.freepik.com/free-vector/mountain-landscape-night_2381971.htm"
                >Bakgrunn</a
              >
            </li>

            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.vecteezy.com/vector-art/346477-black-and-white-checkered-seamless-repeating-pattern-background-vector-illustration"
                >Tekstur mållinje</a
              >
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.123rf.com/photo_43273153_seamless-ice-texture-computer-graphic-big-collection.html"
                >Tekstur is</a
              >
            </li>
          </ul>
        </div>
      </div>
    `
  }
}
