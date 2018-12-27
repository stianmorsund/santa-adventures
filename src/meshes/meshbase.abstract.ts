import * as THREE from 'three';

export abstract class MeshBase {
  abstract update(clock?: THREE.Clock): void; // all meshes must inherit update for rendering
  abstract mesh: THREE.Mesh | THREE.Points | THREE.Group;
}
