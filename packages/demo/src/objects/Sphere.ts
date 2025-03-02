import * as THREE from 'three'

export class Sphere {
  public geo = new THREE.SphereGeometry(2)
  public mat = new THREE.MeshPhysicalMaterial({
    color: 0xaaaaaa,
    transparent: true,
    opacity: 0.5,
    roughness: 0.1,
    metalness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  })
  public mesh = new THREE.Mesh(this.geo, this.mat)

  public addToScene(scene: THREE.Scene) {
    scene.add(this.mesh)
  }
}
