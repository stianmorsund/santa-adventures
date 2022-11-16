import { TRACKBASE_Z, POLE_Z } from '../meshes/constants';
import { Gift } from '../meshes/gift';
import { Hinder } from '../meshes/hinder';
import { Pole } from '../meshes/pole';

export class Level1 {
  level: Array<Pole | Hinder | Gift>;
  constructor() {
    this.build();
  }

  private build() {
    this.level = [
      new Gift({ position: { x: -1, y: 30, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 0, y: 30, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 1, y: 30, z: TRACKBASE_Z } }),

      new Hinder({ position: { x: 0, y: 60, z: TRACKBASE_Z } }),

      new Gift({ position: { x: -1, y: 70, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 0, y: 70, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 1, y: 70, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 1, y: 80, z: TRACKBASE_Z } }),

      new Pole({ position: { x: 0, y: 100, z: POLE_Z } }),

      new Gift({ position: { x: 1, y: 105, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 1, y: 107, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 1, y: 109, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 1, y: 111, z: TRACKBASE_Z } }),
      new Gift({ position: { x: 0, y: 113, z: TRACKBASE_Z } }),
      new Gift({ position: { x: -1, y: 115, z: TRACKBASE_Z } }),
    ];
  }

  get gifts(): Gift[] {
    return this.level.filter((entity) => entity instanceof Gift) as Gift[];
  }

  get hinders(): Hinder[] {
    return this.level.filter((entity) => entity instanceof Hinder) as Hinder[];
  }

  get poles(): Pole[] {
    return this.level.filter((entity) => entity instanceof Pole) as Pole[];
  }
}
