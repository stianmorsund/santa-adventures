import * as THREE from 'three';

export abstract class MeshBase {
  abstract mesh: THREE.Mesh | THREE.Points | THREE.Group;
  abstract update(clock?: THREE.Clock): void; // all meshes must inherit update for rendering
}
