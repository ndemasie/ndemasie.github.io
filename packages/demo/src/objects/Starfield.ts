import * as THREE from 'three'

function randomSpherePosition() {
  const radius = Math.random() * 25 + 25
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)

  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)

  return new THREE.Vector3(x, y, z)
}

export class Starfield implements SceneObject {
  public geometry = new THREE.BufferGeometry()

  public material = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    fog: false,
  })

  public points = new THREE.Points(this.geometry, this.material)

  public count = 500

  constructor(options?: { count?: number }) {
    this.count = options?.count ?? this.count

    const positions = []
    const vertices = []
    const colors = []

    for (let i = 0; i < this.count; i += 1) {
      const pos = randomSpherePosition()
      const color = new THREE.Color().setHSL(0.6, 0.2, Math.random())

      positions.push(pos)
      vertices.push(pos.x, pos.y, pos.z)
      colors.push(color.r, color.g, color.b)
    }

    this.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    )
    this.geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3),
    )
  }

  public addToScene(scene: THREE.Scene) {
    scene.add(this.points)
  }
}
