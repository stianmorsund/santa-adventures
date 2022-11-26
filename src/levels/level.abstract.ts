import { FinishLine } from '../meshes/finish-line'
import { Gift } from '../meshes/gift'
import { Hinder } from '../meshes/hinder'
import { Pole } from '../meshes/pole'

export abstract class Level {
  level: Array<Pole | Hinder | Gift | FinishLine>

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
