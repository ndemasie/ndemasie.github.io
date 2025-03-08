import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Sandstorm } from './objects/Sandstorm'
import { Starfield } from './objects/Starfield'

const renderer = new THREE.WebGLRenderer({ antialias: true })

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  100,
)
camera.position.z = 10

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const scene = new THREE.Scene()
// scene.fog = new THREE.FogExp2(0x000000, 0.3)

const sandstorm = new Sandstorm()
sandstorm.addToScene(scene)

const starfield = new Starfield()
starfield.addToScene(scene)

function animate() {
  requestAnimationFrame(animate)
  sandstorm.animate(camera)

  renderer.render(scene, camera)
  controls.update()
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

document.body.appendChild(renderer.domElement)
animate()
resize()
window.addEventListener('resize', resize, false)
