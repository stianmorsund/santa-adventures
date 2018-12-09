// add styles
import './style.css';
// three.js
import * as THREE from 'three';
import { RaceTrack } from './models/racetrack';

// create the scene
let scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xf0f0f0 );

// create the camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();

// set size
renderer.setSize(window.innerWidth, window.innerHeight);

// add canvas to dom
document.body.appendChild(renderer.domElement);


// add lights
let light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(100, 100, 100);
scene.add(light);

let light2 = new THREE.DirectionalLight(0xffffff, 1.0);
light2.position.set(-100, 100, -100);
scene.add(light2);


let parent = new THREE.Object3D();
scene.add(parent);

let mesh;

let tubeGeometry;

const SCALE = 4;
const LOOKAHEAD = true;

let binormal = new THREE.Vector3();
let normal = new THREE.Vector3();

let splineCamera = new THREE.PerspectiveCamera(84, window.innerWidth / window.innerHeight, 0.01, 1000);
parent.add(splineCamera);
let cameraHelper = new THREE.CameraHelper(splineCamera);
scene.add(cameraHelper);

// debug camera
let cameraEye = new THREE.Mesh(new THREE.SphereBufferGeometry(5), new THREE.MeshBasicMaterial({ color: 0xdddddd }));
parent.add(cameraEye);

let raceTrack = new RaceTrack();
let raceTrackMesh = raceTrack.getMesh();
parent.add(raceTrackMesh);

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
  // animate camera along spline
  const time = Date.now();
  const looptime = 20 * 1000;
  let t = (time % looptime) / looptime;

  const raceTrackGeometry = raceTrack.getGeometry();

  let pos = raceTrackGeometry.parameters.path.getPointAt(t);
  pos.multiplyScalar(SCALE);
  // interpolation
  let segments = raceTrackGeometry.tangents.length;
  let pickt = t * segments;
  let pick = Math.floor(pickt);
  let pickNext = (pick + 1) % segments;
  binormal.subVectors(raceTrackGeometry.binormals[pickNext], raceTrackGeometry.binormals[pick]);
  binormal.multiplyScalar(pickt - pick).add(raceTrackGeometry.binormals[pick]);
  let dir = raceTrackGeometry.parameters.path.getTangentAt(t);
  let offset = 15;
  normal.copy(binormal).cross(dir);
  // we move on a offset on its binormal
  pos.add(normal.clone().multiplyScalar(offset));
  splineCamera.position.copy(pos);
  cameraEye.position.copy(pos);
  // using arclength for stablization in look ahead
  let lookAt = raceTrackGeometry.parameters.path
    .getPointAt((t + 30 / raceTrackGeometry.parameters.path.getLength()) % 1)
    .multiplyScalar(SCALE);
  // camera orientation 2 - up orientation via normal
  if (LOOKAHEAD) {
    lookAt.copy(pos).add(dir);
  }

  splineCamera.matrix.lookAt(splineCamera.position, lookAt, normal);
  splineCamera.rotation.setFromRotationMatrix(splineCamera.matrix, splineCamera.rotation.order);
  cameraHelper.update();
  renderer.render(scene, splineCamera);
}

animate();
