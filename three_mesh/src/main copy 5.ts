import * as THREE from "three";
import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";

const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("textures/hdr/002.hdr").then(texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
})

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

// 设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
  "textures/environmentMaps/1/px.jpg",
  "textures/environmentMaps/1/nx.jpg",
  "textures/environmentMaps/1/py.jpg",
  "textures/environmentMaps/1/ny.jpg",
  "textures/environmentMaps/1/pz.jpg",
  "textures/environmentMaps/1/nz.jpg",
]);


// 添加物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
// 材质
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1,
  // envMap: envMapTexture
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// 给场景添加背景
scene.background = envMapTexture;
// 给场景所有的物体添加默认的环境贴图
scene.environment = envMapTexture;


// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 直线光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

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
