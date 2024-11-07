// 导入three.js库的所有成员
import * as THREE from "three";

// 创建一个新的场景对象，用于存放所有的3D对象
const scene = new THREE.Scene();

// 创建一个新的透视相机对象
// 参数分别是：视野角度、宽高比、近裁剪面、远裁剪面
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度为75度
  window.innerWidth / window.innerHeight, // 宽高比，保持相机视角的纵横比
  0.1, // 近裁剪面，距离相机0.1单位的地方不会被渲染
  1000 // 远裁剪面，距离相机1000单位的地方不会被渲染
);
// 设置相机的位置，这里设置在x=0, y=0, z=10的位置
camera.position.set(0, 0, 10);
// 将相机添加到场景中
scene.add(camera);

// 创建一个立方体的几何形状，边长为1
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建一个基本材质，设置颜色为绿色
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建一个网格（Mesh），使用上面创建的几何形状和材质
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将立方体添加到场景中
scene.add(cube);

// 创建一个WebGL渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器的尺寸，使其填满整个浏览器窗口
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染器生成的DOM元素添加到文档的body中
document.body.appendChild(renderer.domElement);
// 使用渲染器渲染场景和相机，这样我们就可以在网页上看到3D场景了
renderer.render(scene, camera);
