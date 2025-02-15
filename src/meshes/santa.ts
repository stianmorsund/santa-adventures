import * as THREE from 'three'
import * as santa from '../+state/santa-slice'
import { store } from '../+state/store'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { SantaXPosition } from '../models/models'
import { Scene } from '../scene'
import { LoadingManager } from '../utils/loading-manager'
import { MeshBase } from './meshbase.abstract'

export class Santa extends MeshBase {
  mesh: THREE.Group = new THREE.Group()
  private mixer: THREE.AnimationMixer
  private loadingManager = LoadingManager.getInstance()
  private loader = new FBXLoader(this.loadingManager.manager)
  private readonly SANTA_MODEL_PATH = 'assets/models/santa/santa_blender.fbx'
  private readonly BASE_BOUNCEVALUE = 0.18
  private bounceValue = this.BASE_BOUNCEVALUE
  private readonly GROUND_POSITION = 0.3
  private readonly LERP_FACTOR = 0.3
  private readonly GRAVITY = 120 / 10000
  private readonly DISTANCE_FROM_CAMERA = 5.5;


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
      const bumpMap = new THREE.TextureLoader(this.loadingManager.manager).load(
        require('../assets/models/santa/Santa_bump.png')
      )

      skinnedMesh.material.map = uvmap
      skinnedMesh.material.bumpMap = bumpMap
      skinnedMesh.material.bumpScale = 0.015
      skinnedMesh.receiveShadow = true
      skinnedMesh.castShadow = true

      const size = 0.009
      this.mesh.scale.set(size, size, size)
      this.mesh.position.z = this.DISTANCE_FROM_CAMERA;
      this.resetToWalkingPosition()


      // Todo, mesh should be added by scene
      Scene.getInstance().threeScene.add(this.mesh)
      action.timeScale = 1.2

      action.play()
    })
  }

  animateCrawl() {
    this.mesh.rotation.x = Math.PI / 2
    this.mesh.position.y = this.GROUND_POSITION
  }

  animateJump() {
    this.mesh.rotation.x -= 0.12
    this.mesh.position.y += this.bounceValue
    this.bounceValue -= this.GRAVITY
  }

  resetToWalkingPosition() {
    this.mesh.rotation.x = 0
    this.mesh.rotation.y = -(Math.PI)
    this.mesh.position.y = this.GROUND_POSITION
    this.bounceValue = this.BASE_BOUNCEVALUE
  }

  interpolateXMovements(santaXPosition: SantaXPosition) {
    this.mesh.position.x = THREE.MathUtils.lerp(this.mesh.position.x, santaXPosition, this.LERP_FACTOR)
  }

  update(delta: number) {
    const { isJumping, santaXPosition, isCrawling } = store.getState().santa

    if (this.mixer) {
      // Sync santa animation with world movement
      this.mixer.update(delta * 2.5)
    }

    this.interpolateXMovements(santaXPosition)

    if (isJumping) {
      this.animateJump()
      // Reset y-position when landing
      if (this.mesh.position.y < this.GROUND_POSITION) {
        store.dispatch(santa.landed())
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
