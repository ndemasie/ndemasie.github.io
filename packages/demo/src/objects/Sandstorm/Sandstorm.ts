import * as THREE from 'three'

import fragmentShader from './fragmentShader.glsl'
import vertexShader from './vertexShader.glsl'

export class Sandstorm {
  public geo = new THREE.SphereGeometry(5.1, 64, 64) // Slightly larger than the planet
  public mat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      u_time: { value: 0.0 },
      u_opacity: { value: 0.5 },
    },
    vertexShader,
    fragmentShader,
  })

  public mesh = new THREE.Mesh(this.geo, this.mat)

  public addToScene(scene: THREE.Scene) {
    scene.add(this.mesh)
  }

  public animate() {
    this.mesh.rotation.y += 0.002
    this.mat.uniforms.u_time.value += 0.01
  }
}
