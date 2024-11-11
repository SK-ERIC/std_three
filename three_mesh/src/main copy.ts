import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("textures/door/alpha.jpg");

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  transparent: true,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 添加平面
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  basicMaterial
);
plane.position.set(3, 0, 0);
scene.add(plane);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
