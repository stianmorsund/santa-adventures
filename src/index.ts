import * as THREE from 'three'
import { Camera } from './camera/camera'
import { createRenderer } from './renderer'
import { Scene } from './scene'
import './styles/style.css'
import './views/credits'
import './views/finished'
import './views/game-over'
import './views/score'
import './views/welcome'

const OrbitControls = require('three-orbit-controls')(THREE)
const clock = new THREE.Clock()
const scene: Scene = Scene.getInstance()
const threeScene: THREE.Scene = scene.threeScene
const renderer = createRenderer()
const camera = Camera.getInstance().setPosition().setRotation().threeCamera

// addOrbitControls()

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate(): void {
  scene.render(clock)
  renderer.render(threeScene, camera)
  requestAnimationFrame(animate)
}

function addOrbitControls() {
  const orbitControl = new OrbitControls(camera, renderer.domElement)
  orbitControl.addEventListener('change', animate)
  orbitControl.enableDamping = true
  orbitControl.dampingFactor = 0.8
  orbitControl.enableZoom = true
}

animate()
