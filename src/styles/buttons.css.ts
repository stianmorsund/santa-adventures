import { css } from 'lit'

export const buttons = css`
  .btn {
    color: var(--color-dark-blue);
    text-decoration: none;
    background-color: #fff;
    letter-spacing: 0.5px;
    font-family: 'Yanone Kaffeesatz';
    font-weight: 700;
    font-size: 3em;
    padding: 4px;
    border-radius: 8px;
    border: 0;
    /* box-shadow: 0px 9px 0px var(--color-light-blue), 0px 9px 25px rgba(0, 0, 0, 0.7); */
    box-shadow: 0px 9px 0px var(--color-light-blue), 0px 2px 3px rgba(0, 0, 0, 0.7);
    width: 230px;
    text-align: center;
    transition: all 0.1s ease;
    outline: 0;
    cursor: pointer;
  }

  .btn:hover {
    transform: scale(1.07);
  }

  .btn:active {
    position: relative;
    box-shadow: 0px 3px 0px var(--color-light-blue), 0px 3px 6px rgba(0, 0, 0, 0.9);
    top: 6px;
  }

  .btn-key {
    width: auto;
    font-size: 2em;
    border: 2px solid #fff;
    background: transparent;
    color: #fff;
    box-shadow: 0px 5px 0px var(--color-light-blue), 0px 9px 25px rgba(0, 0, 0, 0.7);
  }

  .btn-credits {
    color: var(--color-white);
    appearance: none;
    background: none;
    border: 0;
    font-size: 1.2em;
    padding: 0;
    margin-top: 2em;
    display: inline-flex;
    border-bottom: 1px solid var(--color-white);
    cursor: pointer;
  }

  .btn-credits:hover {
    color: #fff;
    transform: scale(1.07);
  }

  .btn-credits-close {
    appearance: none;
    background: none;
    border: 0;
    font-size: 1.2em;
    color: var(--color-dark-blue);
    border-radius: 6px;
    border: 2px solid;
    padding: 0.2em 1em;
    cursor: pointer;
  }

  .btn-credits-close:hover {
    background: var(--color-dark-blue);
    color: #fff;
  }
`
