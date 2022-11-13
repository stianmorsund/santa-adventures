import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { Scene } from '../scene';
import { Enemy } from './enemy';
import { LoadingManager } from '../controls/loading-manager';

export class EnemyBuilder {
  
  scene: Scene = Scene.getInstance();
  readonly count: number;
  readonly MODEL_PATH = 'src/assets/models/snowman/SnowmanOBJ.obj';
  readonly MATERIAL_PATH = 'src/assets/models/snowman/SnowmanOBJ.mtl';
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  private mtlLoader = new MTLLoader(this.loadingManager.manager);
  private objLoader = new OBJLoader(this.loadingManager.manager);
  constructor(count: number) {
    this.count = count;
  }

  build(): Promise<Enemy[]> {
    return new Promise((resolve, reject) => {
      this.mtlLoader.load('src/assets/models/snowman/SnowmanOBJ.mtl', (materials) => {
        materials.preload();
        this.objLoader.setMaterials(materials);
        this.objLoader.load('src/assets/models/snowman/SnowmanOBJ.obj', (snowman) => {
          const enemies: Enemy[] = [];
          for (let i = 0; i < this.count; i++) {
            const posX = (i % 2) * (i % 2 ? -1 : 1);
            const posY = i * 50 + 20;
            enemies.push(new Enemy(snowman.clone(), { x: posX, y: posY, z: 0 }));
          }
          resolve(enemies);
        });
      });
    });
  }
}
