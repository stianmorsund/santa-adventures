import THREE = require('three');
export class Skybox {
  mesh: THREE.Mesh;

  constructor() {
    const path = '../assets/textures/skybox';
    const format = 'jpg';
    const urls = [
      `${path}/front.${format}`,
      `../assets/textures/snow_down.jpg`,
      `${path}/up.${format}`,
      `${path}/down.${format}`,
      `${path}/right.${format}`,
      `${path}/left.${format}`
    ];

    const shader = THREE.ShaderLib.cube;
    shader.uniforms.tCube.value = THREE.ImageUtils.loadTextureCube(urls);

    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      fragmentShader: shader.fragmentShader,
      side: THREE.BackSide,
      uniforms: shader.uniforms,
      vertexShader: shader.vertexShader
    });

    // const textureCube = new THREE.CubeTextureLoader()
    //   .setPath('../assets/textures/skybox/')
    //   .load([`front.jpg`, `back.jpg`, `up.jpg`, `down.jpg`, `right.jpg`, `left.jpg`]);

    // const material = new THREE.MeshBasicMaterial({
    //   envMap: textureCube,
    //   side: THREE.BackSide
    // });

    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), material);
  }

  getMesh() {
    return this.mesh;
  }
}
