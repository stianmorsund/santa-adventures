import * as THREE from 'three'
import { Scene } from './scene'
import './styles/style.css'
import './views/credits'
import './views/game-over'
import './views/score'

const OrbitControls = require('three-orbit-controls')(THREE)

const scene: Scene = Scene.getInstance()
const threeScene: THREE.Scene = scene.threeScene
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setClearColor(0x000000, 0)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const canvas = renderer.domElement
const camera = addCamera()
document.body.appendChild(canvas)

// addOrbitControls()

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

function addCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 7.5
  camera.position.y = 1.2
  camera.rotation.x = -0.15
  return camera
}

function addOrbitControls() {
  const orbitControl = new OrbitControls(camera, renderer.domElement)
  orbitControl.addEventListener('change', render)
  orbitControl.enableDamping = true
  orbitControl.dampingFactor = 0.8
  orbitControl.enableZoom = true
}

animate()
