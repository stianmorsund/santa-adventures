import * as THREE from 'three';

export class RaceTrack {
  public material: THREE.MeshBasicMaterial;
  public geometry: THREE.TubeBufferGeometry;
  public mesh: THREE.Mesh;
  public plane: THREE.Mesh;
  public readonly SCALE = 4;

  private readonly CURVE = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -40, -40),
    new THREE.Vector3(0, 40, -40),
    // new THREE.Vector3(0, 40, -40),
    new THREE.Vector3(0, 40, 40),
    new THREE.Vector3(0, -40, 40)
  ]);
  private readonly EXTRUSION_SEGMENTS = 100;
  private readonly RADIUS_SEGMENTS = 10;

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

    this.geometry = new THREE.TubeBufferGeometry(this.CURVE, this.EXTRUSION_SEGMENTS, 2, this.RADIUS_SEGMENTS, false);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    const wireframe = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.add(wireframe);
    this.mesh.scale.set(this.SCALE, this.SCALE, this.SCALE);
    this.plane = this.addPlane();
  }

  addPlane() {
    const snowImg = require('../assets/textures/snow.jpg');
    const geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);

    const texture = new THREE.TextureLoader().load(snowImg);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      color: 0x996633,
      specular: 0x050505,
      shininess: 100
    });

    const iceMesh = new THREE.Mesh(geometry, material);
    iceMesh.rotateX(Math.PI / 5);
    iceMesh.position.y = -0.5;
    // this.state.scene.add(iceMesh);

    return iceMesh;
  }

  getGeometry() {
    return this.geometry;
  }

  getMesh() {
    return this.mesh;
  }

  getPlane() {
    return this.plane;
  }
}
