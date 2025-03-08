import * as THREE from 'three'

export class SphereParticles implements SceneObject {
  public geometry = new THREE.BufferGeometry()

  public material = new THREE.PointsMaterial({
    color: 0xffaa00,
    size: 0.1,
    blending: THREE.AdditiveBlending,
  })

  public points = new THREE.Points(this.geometry, this.material)

  public count = 500

  constructor(options?: { count?: number }) {
    this.count = options?.count ?? this.count

    const positions = new Float32Array(this.count * 3)
    const velocities = new Float32Array(this.count * 3)

    for (let i = 0; i < this.count; i++) {
      // Random initial positions within the sphere
      let x, y, z
      do {
        x = (Math.random() * 2 - 1) * 2
        y = (Math.random() * 2 - 1) * 2
        z = (Math.random() * 2 - 1) * 2
      } while (x * x + y * y + z * z > 4) // Ensure particles are inside the sphere

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Set velocities to create orbital motion
      velocities[i * 3] = -y * 0.02
      velocities[i * 3 + 1] = x * 0.02
      velocities[i * 3 + 2] = z * 0.02
    }

    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    )
    this.geometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocities, 3),
    )
  }

  public addToScene(scene: THREE.Scene) {
    scene.add(this.points)
  }

  public animate() {
    const positions = this.geometry.attributes.position
    const velocities = this.geometry.attributes.velocity

    for (let i = 0; i < this.count; i++) {
      const x = positions.array[i * 3]
      const y = positions.array[i * 3 + 1]
      const z = positions.array[i * 3 + 2]

      const vx = velocities.array[i * 3]
      const vy = velocities.array[i * 3 + 1]
      const vz = velocities.array[i * 3 + 2]

      // Update positions based on velocity
      positions.array[i * 3] += vx
      positions.array[i * 3 + 1] += vy
      positions.array[i * 3 + 2] += vz

      // Apply a gravitational pull toward the center
      const distanceSquared = x * x + y * y + z * z
      const gravityStrength = -0.0005
      const gravityFactor = gravityStrength / Math.sqrt(distanceSquared)

      velocities.array[i * 3] += x * gravityFactor
      velocities.array[i * 3 + 1] += y * gravityFactor
      velocities.array[i * 3 + 2] += z * gravityFactor

      // Constrain particles within the sphere
      if (distanceSquared > 4) {
        const scale = 2 / Math.sqrt(distanceSquared)
        positions.array[i * 3] *= scale
        positions.array[i * 3 + 1] *= scale
        positions.array[i * 3 + 2] *= scale
      }
    }

    positions.needsUpdate = true
  }
}
