// add styles
import './style.css';
// three.js
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

// create the scene
const scene: Scene = Scene.getInstance();
const clock = new THREE.Clock();
clock.start();
const threeScene: THREE.Scene = scene.scene;
// const renderer = new THREE.WebGLRenderer({ alpha: false });

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7.5;
camera.position.y = 1;

// set size
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; //enable shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const canvas = renderer.domElement;
// add canvas to dom
document.body.appendChild(canvas);

/***
 * Add models
 * */
const scoreElement: HTMLElement = document.getElementById('score');
let score = 0;

const track = new Track();
scene.addModel(track);

const hero = new Hero();
scene.addModel(hero);

const controls = new Controls(canvas, hero);

const forest = new Forest();
scene.addModel(forest);

const snow = new Snow();
scene.addModel(snow);

let previouslyCollected: Gift;

/**
 * @returns the gift our hero collided with
 */
function getCollectedGift(): Gift {
  return track.gifts.find(
    g => Math.floor(g.mesh.position.y) === 0 && g.mesh.position.x === hero.currentPosition && !hero.isJumbing
  );
  // const heroPos = hero.mesh.position.x
  // track.gifts.forEach(gift => {
  //   hero.mesh.position.x === gift.mesh.position.y === this;
  // });
}

function animateScore() {
  scoreElement.classList.add('pulse');
  scoreElement.textContent = score.toString();

  setTimeout(() => {
    scoreElement.classList.remove('pulse');
  }, 1000);
}

// Orbit

// let orbitControl = new OrbitControls(camera, renderer.domElement); //helper to rotate around in scene
// orbitControl.addEventListener('change', render);
// orbitControl.enableDamping = true;
// orbitControl.dampingFactor = 0.8;
// orbitControl.enableZoom = true;

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
  if (scene.models) {
    scene.models.forEach(m => {
      m.update(clock);
    });
  }
  const collected: Gift = getCollectedGift();
  if (collected) {
    if (collected !== previouslyCollected) {
      previouslyCollected = collected;
      collected.isCollected = true;
      score++;
      animateScore();
    }
  }

  renderer.render(threeScene, camera);
}

animate();
