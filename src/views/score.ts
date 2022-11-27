import { css, html, LitElement } from 'lit'
import { classMap } from 'lit-html/directives/class-map.js'
import { customElement, property } from 'lit/decorators.js'
import { store } from '../+state/effects'
import '../styles/style.css'

@customElement('sa-score')
export class SimpleGreeting extends LitElement {
  @property() score = 0

  classes = { animated: true, pulse: false }
  constructor() {
    super()
    store.subscribe(() => {
      this.score = store.getState().score
      this.animateScore()
    })
  }

  animateScore() {
    this.classes.pulse = true
    setTimeout(() => {
      this.classes.pulse = false
    }, 1000)
  }
  static styles = css`
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
  `

  render() {
    return html`
      <div class="score-wrapper">
        <img class="gift" src="assets/gift.svg" />
        <div class="${classMap(this.classes)}" id="score">${this.score}</div>
      </div>
    `
  }
}
