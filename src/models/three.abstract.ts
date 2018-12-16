import * as THREE from 'three';

export abstract class ThreeModel {
  abstract update(clock?: THREE.Clock): void; // all models must inherit update for rendering
  abstract mesh: THREE.Mesh | THREE.Points;
}
