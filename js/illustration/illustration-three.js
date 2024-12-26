import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
const loader = new FBXLoader();

//PALING PANJANG
loader.load('model/wood/wood.fbx', (fbx) => {
    fbx.scale.set(1.5, 0.1, 0.25)
    fbx.rotation.set(0, Math.PI / 2, 0)
    fbx.position.set(0, 0, 0)
    scene.add(fbx)
})

//SEDANG
loader.load('model/wood/wood.fbx', (fbx) => {
    fbx.scale.set(1, 0.1, 0.25)
    fbx.rotation.set(0, Math.PI / 2, 0)
    fbx.position.set(-0.5, 0, -0.02)
    scene.add(fbx)
})

// //TERKECIL
loader.load('model/wood/wood.fbx', (fbx) => {
    fbx.scale.set(1, 0.1, 0.2)
    fbx.rotation.set(0, Math.PI / 2, 0)
    fbx.position.set(-0.25, 0.2, -0.03)
    scene.add(fbx)
})


const ambientlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientlight);

const light2 = new THREE.DirectionalLight(0xffffff, 1.7);
light2.position.set(5, 15, -15)
scene.add(light2);


const grid = new THREE.GridHelper(3, 3 )
scene.add(grid)

camera.position.z = 5;
// camera.rotation.y = 0;
// camera.rotation.x = -0.1

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
