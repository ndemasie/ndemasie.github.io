import * as THREE from 'three'

import fragmentShader from './fragmentShader.glsl'
import vertexShader from './vertexShader.glsl'

import { SceneObject } from '../../types/SceneObject'

export class Palantir implements SceneObject {
  public geometry = new THREE.SphereGeometry(1, 64, 64)

  public material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },
    vertexShader,
    fragmentShader,
  })

  public mesh = new THREE.Mesh(this.geometry, this.material)

  constructor() {}

  public addToScene(scene: THREE.Scene) {
    scene.add(this.mesh)
  }

  public animate() {
    this.material.uniforms.time.value += 0.01
  }

  public resize(width: number, height: number) {
    this.material.uniforms.resolution.value.set(width, height)
  }
}
