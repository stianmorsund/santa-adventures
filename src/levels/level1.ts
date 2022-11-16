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
      new Gift({ position: { x: -1, y: 30 } }),
      new Gift({ position: { x: 0, y: 30 } }),
      new Gift({ position: { x: 1, y: 30 } }),

      new Hinder({ position: { x: 0, y: 60 } }),

      new Gift({ position: { x: -1, y: 70 } }),
      new Gift({ position: { x: 0, y: 70 } }),
      new Gift({ position: { x: 1, y: 70 } }),
      new Gift({ position: { x: 1, y: 80 } }),

      new Pole({ position: { x: 0, y: 100 } }),

      new Gift({ position: { x: 1, y: 105 } }),
      new Gift({ position: { x: 1, y: 107 } }),
      new Gift({ position: { x: 1, y: 109 } }),
      new Gift({ position: { x: 1, y: 111 } }),
      new Gift({ position: { x: 0, y: 113 } }),
      new Gift({ position: { x: -1, y: 115 } }),
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
