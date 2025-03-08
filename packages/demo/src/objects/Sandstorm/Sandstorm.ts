import * as THREE from 'three'

import fragmentShader from './fragmentShader.glsl'
import vertexShader from './vertexShader.glsl'

export class Sandstorm {
  public geometry = new THREE.SphereGeometry(3.1, 64, 64)

  public material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      u_time: { value: 0.0 },
      u_opacity: { value: 0.5 },
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
    this.material.uniforms.u_time.value += 0.01
  }
}
