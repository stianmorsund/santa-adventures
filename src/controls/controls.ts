import { Scene } from '../scene';
import { Hero } from '../meshes/hero';
import * as Hammer from 'hammerjs';

const overlay: HTMLElement = document.getElementById('overlay');
const playButton: HTMLElement = document.getElementById('btn-play');

export class Controls {
  canvas: HTMLCanvasElement;
  scene: Scene = Scene.getInstance();
  hero: Hero;
  isPlaying: boolean = true;
  constructor(canvas: HTMLCanvasElement, hero: Hero) {
    this.canvas = canvas;
    this.hero = hero;
    document.onkeydown = e => this.handleKeyDown(e);
    playButton.addEventListener('click', () => (this.isPlaying = true));

    // Setup touch controls
    const mc = new Hammer.Manager(this.canvas);
    const swipe = new Hammer.Swipe();
    mc.add(swipe);
    mc.on('swipe', e => this.handleTouch(e));
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
        this.hero.handleJump();
        break;
    }
  }

  toggleOverlay() {
    if (overlay.style.display === 'none') {
      overlay.style.display = 'flex';
    } else {
      overlay.style.display = 'none';
    }
  }
}
