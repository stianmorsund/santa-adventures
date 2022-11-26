import * as THREE from 'three'
import * as FBXLoader from 'wge-three-fbx-loader'

import { santaLanded } from '../+state/actions'
import { store } from '../+state/effects'
import { LoadingManager } from '../controls/loading-manager'
import { PossibleXPositions } from '../models/models'
import { Scene } from '../scene'
import { MeshBase } from './meshbase.abstract'

export class Santa extends MeshBase {
  mesh: THREE.Group = new THREE.Group()
  scene: Scene = Scene.getInstance()
  mixer: THREE.AnimationMixer

  isJumpAllowed = true

  private readonly SANTA_MODEL_PATH = 'assets/models/santa/santa_blender.fbx'
  private readonly BASE_BOUNCEVALUE = 0.16
  private bounceValue = this.BASE_BOUNCEVALUE
  private readonly GROUND_POSITION = 0.6
  private readonly LERP_FACTOR = 1500
  private readonly GRAVITY = 120 / 10000

  private loadingManager: LoadingManager = LoadingManager.getInstance()
  private loader = new FBXLoader(this.loadingManager.manager)

  constructor() {
    super()
    this.build()
  }

  build() {
    this.loader.load(this.SANTA_MODEL_PATH, (object: any) => {
      this.mesh = object
      const clips = object.animations
      this.mixer = new THREE.AnimationMixer(this.mesh)
      const clip = THREE.AnimationClip.findByName(clips, 'Santa.001|Santa.001|Take 001|BaseLayer')
      const action = this.mixer.clipAction(clip)
      const skinnedMesh: any = this.mesh.children.find((c) => c.name === 'Santa_skinned')
      const uvmap = new THREE.TextureLoader(this.loadingManager.manager).load(
        require('../assets/models/santa/Santa_UV.png')
      )
      skinnedMesh.material.map = uvmap
      skinnedMesh.receiveShadow = true
      skinnedMesh.castShadow = true

      this.mesh.position.y = this.GROUND_POSITION
      this.mesh.position.z = 6

      // Todo, mesh should be added by scene
      this.scene.scene.add(this.mesh)
      action.timeScale = 1.2

      action.play()
    })
  }

  animateInitialTurn() {
    if (this.mesh.position.z > 4.4) {
      this.mesh.position.z -= 0.2
    }
    if (this.mesh.rotation.z < Math.PI) {
      this.mesh.rotation.z += 0.2
    }
  }

  animateCrawl() {
    this.isJumpAllowed = false
    this.mesh.rotation.x = -0.5
    this.mesh.position.y = this.GROUND_POSITION
  }

  animateJump() {
    this.isJumpAllowed = false
    this.mesh.rotation.x -= 0.2
    this.mesh.position.y += this.bounceValue
    this.bounceValue -= this.GRAVITY
  }

  resetToWalkingPosition() {
    this.mesh.rotation.x = -(Math.PI / 2)
    this.bounceValue = this.BASE_BOUNCEVALUE
  }

  interpolateXMovements({ clock, santaPosition }: { clock: THREE.Clock; santaPosition: PossibleXPositions }) {
    this.mesh.position.x = THREE.Math.lerp(this.mesh.position.x, santaPosition, this.LERP_FACTOR * clock.getDelta())
  }

  update(clock: THREE.Clock) {
    const { isJumping, santaPosition, isCrawling } = store.getState()

    // Allow jumping slightly above ground level for better experience

    this.isJumpAllowed = this.mesh.position.y <= 0.8
    if (this.mixer) {
      this.mixer.update(clock.getDelta() * 2)
    }

    this.animateInitialTurn()
    this.interpolateXMovements({ clock, santaPosition })

    if (isJumping) {
      this.animateJump()
      // Reset y-position when landing
      if (this.mesh.position.y < this.GROUND_POSITION) {
        store.dispatch(santaLanded())
        this.mesh.position.y = this.GROUND_POSITION
      }
    } else {
      this.resetToWalkingPosition()
    }

    if (isCrawling) {
      this.animateCrawl()
    }
  }
}
