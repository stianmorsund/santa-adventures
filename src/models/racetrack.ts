import * as THREE from 'three';

export class RaceTrack {
  public material: THREE.MeshBasicMaterial;
  public geometry: THREE.TubeBufferGeometry;
  public mesh: THREE.Mesh;

  private readonly CURVE = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -40, -40),
    new THREE.Vector3(0, 40, -40),
    new THREE.Vector3(0, 140, -40),
    new THREE.Vector3(0, 40, 40),
    new THREE.Vector3(0, -40, 40)
  ]);
  private readonly EXTRUSION_SEGMENTS = 50;
  private readonly RADIUS_SEGMENTS = 10;
  public SCALE = 4;

  constructor() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true
    });

    this.geometry = new THREE.TubeBufferGeometry(this.CURVE, this.EXTRUSION_SEGMENTS, 2, this.RADIUS_SEGMENTS, true);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    const wireframe = new THREE.Mesh(this.geometry, this.material);
    this.mesh.add(wireframe);
    this.mesh.scale.set(this.SCALE, this.SCALE, this.SCALE);
  }

  getGeometry() {
    return this.geometry;
  }

  getMesh() {
    return this.mesh;
  }
}
