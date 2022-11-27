import { css } from 'lit'

export const overlays = css`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    animation: overlay 200ms linear;
  }

  .overlay--hidden {
    display: none;
  }

  .modal {
    position: fixed;
    z-index: 9999;
    display: flex;
    width: 50%;
    height: 400px;
    border-radius: 40px;
    background: #fff;
    color: #000;
    padding: 2em;
    box-shadow: 0 0 50px 0px rgba(0, 0, 0, 20%);
  }

  .modal h2 {
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-size: 3.6em;
    margin-bottom: 0.5em;
  }

  .content {
    max-width: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    animation: slideUp 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: 300ms transform ease;
  }
`
