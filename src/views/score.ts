import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { store } from '../+state/store'
import { animations } from '../styles/animations.css'

@customElement('sa-score')
export class Score extends LitElement {
  @property() isAnimating = false
  @property() score = 0

  constructor() {
    super()
    store.subscribe(() => {
      const { score } = store.getState().santa
      if (score !== this.score) {
        this.score = score
        this.animateScore()
      }
    })
  }

  animateScore() {
    this.isAnimating = true
    setTimeout(() => {
      this.isAnimating = false
    }, 1000)
  }

  static styles = [
    animations,
    css`
      .score-wrapper {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;
        top: 0;
        right: 10px;
        font-size: 3.7em;
        font-weight: 700;
        font-family: 'Yanone Kaffeesatz', sans-serif;
        padding: 10px;
        color: #fff;
        text-shadow: 0 4px 0 var(--color-dark-blue);
      }
      .score-wrapper .gift {
        width: 70px;
        margin-right: 20px;
      }
    `,
  ]

  render() {
    return html`
      <div class="score-wrapper">
        <img class="gift" src="assets/gift.svg" />
        <div class="animated ${this.isAnimating ? 'pulse' : ''}">${this.score}</div>
      </div>
    `
  }
}
