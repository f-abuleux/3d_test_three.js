import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
const loader = new FBXLoader()

const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0'
labelRenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRenderer.domElement)

function createLabel(text, position) {
    const div = document.createElement('div');
    div.textContent = text
    div.style.color = 'white'
    div.style.fontSize = '12px'
    div.style.textShadow = '2px 1px 1px black'

    const label = new CSS2DObject(div)
    label.position.set(position.x, position.y, position.z)
    return label
}

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
    fbx.position.set(-0.25, 0.2, -0.06)
    scene.add(fbx)
})

function createCube(x, y, z) {
    const box = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    const materialbox = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(box, materialbox);
    cube.position.set(x, y, z)
    scene.add(cube);
}

function Line(color, x1, y1, z1, x2, y2, z2, meter = 0) {
    const material = new THREE.LineDashedMaterial({
        color: color,
        linewidth: 12,
        scale: 10,
        dashSize: 3,
        gapSize: 10,
    })
    const points = [];
    points.push(new THREE.Vector3(x1, y1, z1))
    points.push(new THREE.Vector3(x2, y2, z2))

    createCube(x1, y1, z1)
    createCube(x2, y2, z2)

    if (color == "0xffffff") {
        const annotation = createLabel(`${meter}m`, new THREE.Vector3((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2));
        scene.add(annotation);
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line)
}

//Primary
Line(0x0000ff, 10, -0.1, 1.5, -10, -0.1, 1.5)
Line(0xff0000, 0.25, -0.1, 10, 0.25, -0.1, -10)
Line(0x00ff00, 0.25, 10, 1.5, 0.25, -10, 1.5)

//Secondary
//PANJANG
Line(0xffffff, 0.25, 0.101, 1.5, 0.25, 0.101, -1.5, 3)
Line(0xffffff, -0.751, -0.101, 0.98, -0.751, -0.101, -1.02 ,2)
Line(0xffffff, -0.451, 0.101, 0.94, -0.451, 0.101, -1.06, 2)
Line(0xffffff, -0.251, -0.101, 1.5, -0.251, -0.101, 0.98, 0.54)
Line(0xffffff, -0.351, 0.102, 0.98, -0.351, 0.102, 0.94, 0.02)

//TINGGI
Line(0xffffff, 0.25, 0.1, 1.501, 0.25, -0.1, 1.501 ,0.2)
Line(0xffffff, -0.751, 0.1, 0.98, -0.751, -0.1, 0.980, 0.2)
Line(0xffffff, -0.05, 0.3, 0.941, -0.05, 0.1, 0.941, 0.2)

//LEBAR
Line(0xffffff, -0.751, -0.1, 0.98, -0.251, -0.101, 0.98, 0.5)
Line(0xffffff, -0.25, -0.1, 1.501, 0.25, -0.1, 1.501, 0.5)
Line(0xffffff, -0.451, 0.101, 0.94, -0.05, 0.1, 0.941, 0.4)

const ambientlight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientlight);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(5, 15, -15)
scene.add(light2);

// const grid = new THREE.GridHelper(3, 3)
// grid.position.y = -0.5
// scene.add(grid)

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}
