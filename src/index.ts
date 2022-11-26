import * as THREE from 'three'
import './styles/style.css'

const OrbitControls = require('three-orbit-controls')(THREE)

import { Scene } from './scene'

const scene: Scene = Scene.getInstance()

const threeScene: THREE.Scene = scene.scene
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setClearColor(0x000000, 0)

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 7.5
camera.position.y = 1.2
camera.rotation.x = -0.15

// set size
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true // enable shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const canvas = renderer.domElement
document.body.appendChild(canvas)

// Orbit

let orbitControl = new OrbitControls(camera, renderer.domElement) //helper to rotate around in scene
orbitControl.addEventListener('change', render)
orbitControl.enableDamping = true
orbitControl.dampingFactor = 0.8
orbitControl.enableZoom = true

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate(): void {
  requestAnimationFrame(animate)
  render()
}

function render(): void {
  scene.render()
  renderer.render(threeScene, camera)
}

animate()
