import { createListenerMiddleware } from '@reduxjs/toolkit'
import { Camera } from '../camera/camera'
import { Scene } from '../scene'
import { reachedFinishline } from './santa-slice'
import { pressedPlay, pressedRestartGame } from './ui-slice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: pressedPlay,
  effect: async (_action) => {
    // Show ccanvas when starting game
    document.getElementById('game-canvas').style.display = 'block'
    document.body.classList.add('game-started')
  },
})

listenerMiddleware.startListening({
  actionCreator: pressedRestartGame,
  effect: async (_action) => {
    // Reset level
    Scene.getInstance().resetLevel()
    // Reset camera
    Camera.getInstance().setRotation().setPosition()
  },
})

listenerMiddleware.startListening({
  actionCreator: reachedFinishline,
  effect: async (_action) => {
    Camera.getInstance().setRotation({ x: -0.15, y: Math.PI, z: 0 }).setPosition({ x: 0, y: 1.2, z: -0.8 })
  },
})
