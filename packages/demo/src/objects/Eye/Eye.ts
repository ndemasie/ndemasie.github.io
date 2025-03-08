import * as THREE from 'three'

import image from './eye-of-sauron.png'

import { SceneObject } from '../../types/SceneObject'

export class Eye implements SceneObject {
  public geometry = new THREE.SphereGeometry(2.9, 32, 32)

  public material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(image),
    side: THREE.BackSide,
  })

  public mesh = new THREE.Mesh(this.geometry, this.material)

  constructor() {}

  public addToScene(scene: THREE.Scene) {
    scene.add(this.mesh)
  }

  public animate(camera: THREE.Camera) {
    this.mesh.lookAt(camera.position)
  }
}
