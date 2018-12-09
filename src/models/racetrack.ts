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
  private readonly EXTRUSION_SEGMENTS = 100;
  private readonly RADIUS_SEGMENTS = 10;
  public SCALE = 4;

  constructor() {
    const snowImg = require('../assets/textures/snow.jpg');
    const texture = new THREE.TextureLoader().load(snowImg);
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.format = THREE.RGBFormat;
    this.material = new THREE.MeshLambertMaterial({
      map: texture,
      combine: THREE.MixOperation
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
