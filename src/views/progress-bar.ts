import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { store } from '../+state/effects'
import { animations } from '../styles/animations.css'

@customElement('sa-progress-bar')
export class ProgressBar extends LitElement {
  @property() isAssetsLoaded = false
  @property() score = 0
  @property() percentLoaded = 0

  constructor() {
    super()
    store.subscribe(() => {
      const { isAssetsLoaded, assetsProgress } = store.getState()
      this.isAssetsLoaded = isAssetsLoaded
      this.setProgress(assetsProgress)
    })
  }

  setProgress({ itemsLoaded, itemsTotal }: { itemsLoaded: number; itemsTotal: number }) {
    this.percentLoaded = (itemsLoaded / itemsTotal) * 100
  }

  static styles = [
    animations,
    css`
      .progress {
        background-color: #fff;
        border-radius: 50px;
        box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 35px;
      }

      .progress__bar {
        width: 0;
        height: inherit;
        box-shadow: inherit;
        border-radius: inherit;
        transition: 0.5s ease all;
        animation: progress-anim 2s linear infinite;
        background-size: 40px 40px;
        background-image: linear-gradient(
          45deg,
          var(--color-red) 25%,
          transparent 25%,
          transparent 50%,
          var(--color-red) 50%,
          var(--color-red) 75%,
          transparent 75%,
          transparent
        );
      }
    `,
  ]

  render() {
    return html`
      <div class="animated progress ${this.isAssetsLoaded ? 'fade-out' : ''}">
        <div role="progressbar" class="progress__bar" style="width:${this.percentLoaded}%"></div>
      </div>
    `
  }
}
