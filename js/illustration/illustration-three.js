import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
const loader = new FBXLoader();

loader.load('model/wood/wood.fbx', (fbx) => {
    fbx.scale.set(13, 0.75, 2)
    fbx.rotation.set(-0.1, 1.95, 0.35)
    fbx.position.set(-2, 0, -20)
    scene.add(fbx)
})

loader.load('model/wood/wood.fbx', (fbx) => {
    fbx.scale.set(9, 0.75, 2)
    fbx.rotation.set(-0.1, 1.95, 0.35)
    fbx.position.set(-6.2, 0.57, -20)
    scene.add(fbx)
})

loader.load('model/wood/wood.fbx', (fbx) => {
    fbx.scale.set(9, 0.75, 1.5)
    fbx.rotation.set(-0.1, 1.95, 0.35)
    fbx.position.set(-5.5, 2.6, -22)
    scene.add(fbx)
})

const ambientlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientlight);

const light2 = new THREE.DirectionalLight(0xffffff, 1.7);
light2.position.set(5, 15, -15 )
scene.add(light2);

camera.position.z = 5;
camera.rotation.z = -0.1
camera.rotation.x = -0.1

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}