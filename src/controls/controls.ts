import { Scene } from '../scene';
import { Hero } from '../meshes/hero';
import * as Hammer from 'hammerjs';
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
  canvas: HTMLCanvasElement;
  scene: Scene = Scene.getInstance();
  hero: Hero;
  isPlaying: boolean = false;
  isAlive: boolean = true;
  score: number = 0;
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  constructor(canvas: HTMLCanvasElement, hero: Hero) {
    this.canvas = canvas;
    this.hero = hero;
    document.onkeydown = (e) => this.handleKeyDown(e);
    playButton.addEventListener('click', () => this.togglewelcomeOverlay());
    creditsButton.addEventListener('click', () => this.toggleCredits());
    restartButton.addEventListener('click', () => this.restartGame());
    creditsCloseBtn.addEventListener('click', () => this.toggleCredits());
    // Setup touch controls
    const mc = new Hammer.Manager(this.canvas);
    const swipe = new Hammer.Swipe();
    mc.add(swipe);
    mc.on('swipe', (e) => this.handleTouch(e));
  }

  handleTouch(event: HammerInput) {
    const { direction } = event;
    switch (direction) {
      case Hammer.DIRECTION_LEFT:
        this.hero.handleMoveLeft();
        break;
      case Hammer.DIRECTION_RIGHT:
        this.hero.handleMoveRight();
        break;
      case Hammer.DIRECTION_UP:
        this.hero.handleJump();
        break;
    }
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
    if (!this.loadingManager.isAllLoaded || !this.isAlive) return;
    this.isPlaying = !this.isPlaying;
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

  restartGame() {
    window.location.reload();
  }
}
