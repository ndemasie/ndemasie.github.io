import * as THREE from 'three'

import fragmentShader from './fragmentShader.glsl'
import vertexShader from './vertexShader.glsl'

export class Palantir {
  public geo = new THREE.SphereGeometry(1, 64, 64)
  public mat = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },
    vertexShader,
    fragmentShader,
  })

  public mesh = new THREE.Mesh(this.geo, this.mat)

  public addToScene(scene: THREE.Scene) {
    scene.add(this.mesh)
  }

  public animate() {
    this.mat.uniforms.time.value += 0.01
  }

  public resize(width: number, height: number) {
    this.mat.uniforms.resolution.value.set(width, height)
  }
}
