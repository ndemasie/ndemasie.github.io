import * as THREE from 'three'

export class Starfield {
  private static randomSpherePoint() {
    const radius = Math.random() * 25 + 25
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)

    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
    }
  }

  public geo = new THREE.BufferGeometry()
  public mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    fog: false,
  })
  public points = new THREE.Points(this.geo, this.mat)

  public count = 500

  constructor(options?: { count?: number }) {
    this.count = options?.count ?? this.count

    const positions = []
    const vertices = []
    const colors = []

    for (let i = 0; i < this.count; i += 1) {
      const point = Starfield.randomSpherePoint()
      const { pos, hue } = point
      const color = new THREE.Color().setHSL(hue, 0.2, Math.random())

      positions.push(point)
      vertices.push(pos.x, pos.y, pos.z)
      colors.push(color.r, color.g, color.b)
    }

    this.geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    )
    this.geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  }

  public addToScene(scene: THREE.Scene) {
    scene.add(this.points)
  }
}
