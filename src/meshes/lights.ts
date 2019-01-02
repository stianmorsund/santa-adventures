import THREE = require('three');

export class Light {
  light: THREE.HemisphereLight;
  lavaLight: THREE.PointLight;
  constructor() {
    /*
         SpotLight( color, intensity, distance, angle, penumbra, decay )

         color — Numeric value of the RGB component of the color.
         intensity — Numeric value of the light's strength/intensity.
         distance -- Maximum distance from origin where light will shine whose intensity is attenuated
         linearly based on distance from origin.
         angle -- Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
         penumbra -- Percent of the spotlight cone that is attenuated due to penumbra. Takes values between
          zero and 1. Default is zero.
         decay -- The amount the light dims along the distance of the light.

         HemisphereLight( skyColor, groundColor, intensity )

         skyColor — Numeric value of the RGB sky color.
         groundColor — Numeric value of the RGB ground color.
         intensity — Numeric value of the light's strength/intensity.
         */

    //this.light = new THREE.SpotLight(0x66ccff, 6, 8000, 1.4, 10);
    this.light = new THREE.HemisphereLight(0xffffff, 0x66ccff, 1);
    // (this.state as any).scene.light = this.light;

    //this.light.castShadow = true;
    //this.light.shadow.mapSize.width = 2048;
    //this.light.shadow.mapSize.height = 2048;

    // this.state.scene.add(this.light);
  }

  update() {
    //this.light.position.x += 100;
    //this.light.target(100,100,100);
  }

  getMesh() {
    return this.light;
  }
}
