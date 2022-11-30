import { css } from 'lit'

export const animations = css`
  .hidden { display: none !important;}
  .animated {
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }

  .pulse {
    -webkit-animation-name: pulse;
    animation-name: pulse;
  }

  .glow {
    -webkit-animation-name: glow;
    animation-name: glow;
  }

  .fade-out {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }

  .fade-in {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn !important;
    animation-duration: 3s !important;
  }

  @keyframes glow {
    from {
      box-shadow: 10px 10px -126px 6px #aef4af;
    }
    to {
      box-shadow: 10px 10px 126px 6px #aef4af;
    }
  }

  @keyframes pulse {
    from {
      transform: scale3d(1, 1, 1);
    }

    50% {
      transform: scale3d(1.2, 1.2, 1.2);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes progress-anim {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }

  @keyframes slideUp {
    0% {
      -webkit-transform: translate3d(0, 100px, 0);
      -moz-transform: translate3d(0, 100px, 0);
      -ms-transform: translate3d(0, 100px, 0);
      -o-transform: translate3d(0, 100px, 0);
      transform: translate3d(0, 100px, 0);
      opacity: 0;
    }

    100% {
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      -o-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes overlay {
    0% {
      background: rgba(0, 0, 0, 0);
    }

    100% {
      background: rgba(0, 0, 0, 0.7);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }


    @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`
