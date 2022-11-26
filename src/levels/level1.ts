import { FinishLine } from '../meshes/finish-line'
import { Gift } from '../meshes/gift'
import { Hinder } from '../meshes/hinder'
import { Pole } from '../meshes/pole'

export class Level1 {
  level: Array<Pole | Hinder | Gift | FinishLine>
  constructor() {
    this.build()
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

      new Hinder({ position: { x: 0, y: 135 } }),

      new Pole({ position: { x: 0, y: 150 } }),
      new Gift({ position: { x: -1, y: 150 } }),
      new Gift({ position: { x: 0, y: 150 } }),

      new Gift({ position: { x: -1, y: 160 } }),
      new Gift({ position: { x: 0, y: 165 } }),
      new Gift({ position: { x: 1, y: 170 } }),
      new Gift({ position: { x: 0, y: 175 } }),
      new Pole({ position: { x: 0, y: 175 } }),

      new Gift({ position: { x: 1, y: 180 } }),
      new Gift({ position: { x: -1, y: 182 } }),
      new Gift({ position: { x: 0, y: 185 } }),
      new Gift({ position: { x: -1, y: 187 } }),

      new Pole({ position: { x: 0, y: 195 } }),
      new Gift({ position: { x: -1, y: 195 } }),
      new Gift({ position: { x: 0, y: 195 } }),

      new Hinder({ position: { x: 0, y: 200 } }),

      new Gift({ position: { x: 1, y: 202 } }),
      new Gift({ position: { x: 1, y: 205 } }),
      new Gift({ position: { x: 1, y: 208 } }),

      new Hinder({ position: { x: 0, y: 209 } }),
      new Gift({ position: { x: 1, y: 212 } }),
      new Gift({ position: { x: 0, y: 215 } }),
      new Gift({ position: { x: -1, y: 219 } }),

      new FinishLine({ position: { y: 220 } }),
    ]
  }

  get gifts(): Gift[] {
    return this.level.filter((entity) => entity instanceof Gift) as Gift[]
  }

  get hinders(): Hinder[] {
    return this.level.filter((entity) => entity instanceof Hinder) as Hinder[]
  }

  get poles(): Pole[] {
    return this.level.filter((entity) => entity instanceof Pole) as Pole[]
  }

  get finishLine(): FinishLine {
    return this.level.find((entity) => entity instanceof FinishLine) as FinishLine
  }
}
