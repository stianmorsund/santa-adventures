import { Scene } from '../scene';
import { Hero } from '../meshes/hero';
import * as Hammer from 'hammerjs';
import { LoadingManager } from './loading-manager';

const overlay: HTMLElement = document.getElementById('overlay');
const playButton: HTMLElement = document.getElementById('btn-play');
const scoreElement: HTMLElement = document.getElementById('score');

export class Controls {
  canvas: HTMLCanvasElement;
  scene: Scene = Scene.getInstance();
  hero: Hero;
  isPlaying: boolean = false;
  score: number = 0;
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  constructor(canvas: HTMLCanvasElement, hero: Hero) {
    this.canvas = canvas;
    this.hero = hero;
    document.onkeydown = (e) => this.handleKeyDown(e);
    playButton.addEventListener('click', () => this.handlePlayBtnClick());

    // Setup touch controls
    const mc = new Hammer.Manager(this.canvas);
    const swipe = new Hammer.Swipe();
    mc.add(swipe);
    mc.on('swipe', (e) => this.handleTouch(e));
  }

  handlePlayBtnClick() {
    this.toggleOverlay();
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
      this.toggleOverlay();
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
    }
  }

  toggleOverlay() {
    if (!this.loadingManager.isAllLoaded) return;
    this.isPlaying = !this.isPlaying;
    const { display } = overlay.style;
    overlay.style.display = display === 'none' ? 'flex' : 'none';
  }

  increaseScore() {
    this.score++;
    scoreElement.classList.add('pulse');
    scoreElement.textContent = this.score.toString();

    setTimeout(() => {
      scoreElement.classList.remove('pulse');
    }, 1000);
  }
}
