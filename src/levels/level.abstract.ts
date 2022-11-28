import { FinishLine } from '../meshes/finish-line'
import { Gift } from '../meshes/gift'
import { Pole } from '../meshes/pole'
import { Wall } from '../meshes/wall'

export abstract class Level {
  level: Array<Pole | Wall | Gift | FinishLine>

  get gifts(): Gift[] {
    return this.level.filter((entity) => entity instanceof Gift) as Gift[]
  }

  get walls(): Wall[] {
    return this.level.filter((entity) => entity instanceof Wall) as Wall[]
  }

  get poles(): Pole[] {
    return this.level.filter((entity) => entity instanceof Pole) as Pole[]
  }

  get finishLine(): FinishLine {
    return this.level.find((entity) => entity instanceof FinishLine) as FinishLine
  }
}
