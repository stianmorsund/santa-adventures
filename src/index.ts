import './styles/style.css';
import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

import { Camera } from './controls/camera';
import { Snow } from './meshes/snow';
import { Scene } from './scene';
import { Track } from './meshes/track';
import { Hero } from './meshes/hero';
import { Gift } from './meshes/gift';
import { Forest } from './meshes/forest';
import { Controls } from './controls/controls';
import { LoadingManager } from './controls/loading-manager';
import { Level1 } from './levels/level1';

const scene: Scene = Scene.getInstance();
const clock = new THREE.Clock();
clock.start();
const threeScene: THREE.Scene = scene.scene;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7.5;
camera.position.y = 1.2;
camera.rotation.x = -0.15;

// set size
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // enable shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const canvas = renderer.domElement;
// add canvas to dom
document.body.appendChild(canvas);

const loadingmanager = new LoadingManager();

const track = new Track();
scene.addModel(track);

const hero = new Hero();
scene.addModel(hero);

const controls = new Controls(canvas, hero);

const forest = new Forest();
scene.addModel(forest);

const snow = new Snow();
scene.addModel(snow);

// Use level1
const { gifts, hinders, poles } = new Level1();

// Hinders, gifts and poles are tied to tracks matrix,
// so it needs to be added
track.addModel(...hinders, ...gifts, ...poles);

interface GameState {
  currentLevel: 0;
  score: number;
  isAlive: number;
  isGameFinished: boolean;
  diedReason: 'hinder' | 'pole';
  heroPosition: -1 | 0 | 1;
  isHeroJumping: boolean;
  isHeroCrawling: boolean;
}

/**
 * @returns the gift our hero collided with
 */
function getCollectedGift(): Gift {
  return gifts.find(
    (g) => Math.floor(g.mesh.position.y * 2) === 0 && g.mesh.position.x === hero.currentPosition && !hero.isJumbing
  );
}

function isHinderCollision(): boolean {
  return hinders.some((hinder) => Math.floor(hinder.mesh.position.y * 2) === 0 && !hero.isJumbing);
  // return false;
}

function isPoleCollision(): boolean {
  return poles.some((pole) => Math.floor(pole.mesh.position.y * 2) === 0 && !hero.isCrawling);
  // return false;
}

// Orbit

let orbitControl = new OrbitControls(camera, renderer.domElement); //helper to rotate around in scene
orbitControl.addEventListener('change', render);
orbitControl.enableDamping = true;
orbitControl.dampingFactor = 0.8;
orbitControl.enableZoom = true;

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(): void {
  requestAnimationFrame(animate);
  render();
}

function render(): void {
  if (!controls.isPlaying || !controls.isAlive) return;
  controls.isAlive = !isHinderCollision() && !isPoleCollision();
  if (!controls.isAlive) {
    controls.displayGameover();
  }

  // Should live in scene
  if (scene.models) {
    scene.models.forEach((m) => {
      m.update(clock);
    });
  }

  const collected: Gift = getCollectedGift();
  if (collected) {
    collected.isCollected = true;
    controls.increaseScore();
  }

  renderer.render(threeScene, camera);
}

animate();
