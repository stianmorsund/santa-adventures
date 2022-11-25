import * as THREE from 'three';
import './styles/style.css';

const OrbitControls = require('three-orbit-controls')(THREE);

import { store } from './+state/effects';
import {
  santaCollectedPackage,
  santaCrashedOnPole,
  santaCrashedOnWall,
  santaReachedFinishline,
} from './+state/reducers';
import { Controls } from './controls/controls';
import { LoadingManager } from './controls/loading-manager';
import { Level1 } from './levels/level1';
import { Forest } from './meshes/forest';
import { Hero } from './meshes/hero';
import { Snow } from './meshes/snow';
import { Track } from './meshes/track';
import { Scene } from './scene';
import { getCollectedGift, isHinderCollision, isPastFinishLine, isPoleCollision } from './utils/collisions';

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

const controls = new Controls(hero);

const forest = new Forest();
scene.addModel(forest);

const snow = new Snow();
scene.addModel(snow);

// Use level1
const { gifts, hinders, poles, finishLine } = new Level1();

// Hinders, gifts and poles are tied to tracks matrix,
// so it needs to be added
track.addModel(...hinders, ...gifts, ...poles, finishLine);

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
  const { isGameFinished, isGamePaused, isAlive, isJumping, isCrawling, santaPosition } = store.getState();
  if (isGamePaused || !isAlive || isGameFinished) return;

  if (isHinderCollision({ hinders, isJumping })) {
    store.dispatch(santaCrashedOnWall());
  }

  if (isPoleCollision({ poles, isCrawling })) {
    store.dispatch(santaCrashedOnPole());
  }

  if (isPastFinishLine(finishLine)) {
    store.dispatch(santaReachedFinishline());
  }

  // Should live in scene
  if (scene.models) {
    scene.models.forEach((m) => {
      m.update(clock);
    });
  }

const collected = getCollectedGift({ gifts, isJumping, santaPosition });
  if (collected) {
    store.dispatch(santaCollectedPackage(collected.id));
  }

  renderer.render(threeScene, camera);
}

animate();
