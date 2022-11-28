import { createAction } from '@reduxjs/toolkit'
import { withPayloadType } from './utils'

export const assetsFinishedLoading = createAction('Assets finished loading')
export const assetsFailed = createAction('Failed loading assets')
export const assetsProgress = createAction(
  'Assets progressed',
  withPayloadType<{ itemsLoaded: number; itemsTotal: number }>()
)
export const pressedPlaybutton = createAction('Pressed Play')
export const pressedEscape = createAction('Pressed Escape')
export const pressedRestartGame = createAction('Pressed Restart Game')
export const pressedCredits = createAction('Pressed Toggle Credits')
