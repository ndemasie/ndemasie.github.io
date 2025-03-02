import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Palantir } from './objects/Palantir'
import { Sandstorm } from './objects/Sandstorm'
import { Starfield } from './objects/Starfield'

const renderer = new THREE.WebGLRenderer({ antialias: true })

const { innerWidth, innerHeight } = window ?? {}
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 100)
camera.position.z = 5

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
// scene.fog = new THREE.FogExp2(0x000000, 0.3)

// const palantir = new Palantir()
// palantir.addToScene(scene)

const sandstorm = new Sandstorm()
sandstorm.addToScene(scene)

const starfield = new Starfield()
starfield.addToScene(scene)

// const particles = new SphereParticles({ count: 1500 })
// particles.addToScene(scene)

function animate() {
  requestAnimationFrame(animate)
  // particles.animate()
  // palantir.animate()
  sandstorm.animate()

  renderer.render(scene, camera)
  controls.update()
}

animate()

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  // palantir.resize(window.innerWidth, window.innerHeight)
  renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', handleWindowResize, false)
