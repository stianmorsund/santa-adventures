import { santaMovedLeft, store } from '../+state/store';
import { Hero } from '../meshes/hero';
import { Scene } from '../scene';
import { addCloseOverlayListener } from '../utils/utils';
import { LoadingManager } from './loading-manager';

const welcomeOverlay: HTMLElement = document.getElementById('welcome-overlay');
const creditsModal: HTMLElement = document.getElementById('credits-modal');
const gameoverOverlay: HTMLElement = document.getElementById('gameover-overlay');
const finalScoreElement: HTMLElement = document.getElementById('final-score');
const playButton: HTMLElement = document.getElementById('btn-play');
const creditsButton: HTMLElement = document.getElementById('btn-credits');
const restartButton: HTMLElement = document.getElementById('btn-restart');
const scoreElement: HTMLElement = document.getElementById('score');
const creditsCloseBtn: HTMLElement = document.getElementById('btn-credits-close');

export class Controls {
  scene: Scene = Scene.getInstance();
  hero: Hero;
  isPaused: boolean = true;
  isAlive: boolean = true;
  isFinished: boolean = false;
  score: number = 0;
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  constructor(hero: Hero) {
    this.hero = hero;
    document.onkeydown = (e) => this.handleKeyDown(e);
    playButton.addEventListener('click', () => this.togglewelcomeOverlay());
    creditsButton.addEventListener('click', () => this.toggleCredits());
    restartButton.addEventListener('click', () => this.restartGame());
    creditsCloseBtn.addEventListener('click', () => this.toggleCredits());
    addCloseOverlayListener(creditsModal, this.toggleCredits);
  }

  handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (key === 'Escape') {
      if (this.isCreditsOpened()) {
        this.toggleCredits('hide');
        return;
      }
      this.togglewelcomeOverlay();
    }
    // Handle keyboard hero movement
    if (this.hero.isJumbing) return;
    switch (key) {
      case 'a':
      case 'ArrowLeft':
        store.dispatch(santaMovedLeft());
        this.hero.handleMoveLeft();

        break;
      case 'd':
      case 'ArrowRight':
        this.hero.handleMoveRight();
        break;
      case ' ':
      case 'ArrowUp':
        this.hero.handleJump();
        break;
      case 's':
      case 'ArrowDown':
        this.hero.handleCrawl();
        break;
    }
  }

  togglewelcomeOverlay() {
    document.body.classList.add('game-started');
    if (!this.loadingManager.isAllLoaded || !this.isAlive) return;
    this.isPaused = !this.isPaused;
    const { display } = welcomeOverlay.style;
    welcomeOverlay.style.display = display === 'none' ? 'flex' : 'none';
  }

  isCreditsOpened = () => creditsModal.style.display === 'flex';

  toggleCredits(newState?: 'show' | 'hide') {
    const { display } = creditsModal.style;
    if (newState === 'show') {
      creditsModal.style.display = 'flex';
      return;
    }
    if (newState == 'hide') {
      creditsModal.style.display = 'none';
      return;
    }
    creditsModal.style.display = display === 'none' || display === '' ? 'flex' : 'none';
  }

  increaseScore() {
    this.score++;
    scoreElement.classList.add('pulse');
    scoreElement.textContent = this.score.toString();

    setTimeout(() => {
      scoreElement.classList.remove('pulse');
    }, 1000);
  }

  displayGameover() {
    finalScoreElement.textContent = this.score.toString();
    gameoverOverlay.style.display = 'flex';
  }

  displayGameFinished() {}

  restartGame() {
    window.location.reload();
  }
}
