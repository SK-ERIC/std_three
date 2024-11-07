// 导入three.js库的所有成员
import * as THREE from "three";
// 导入OrbitControls控制库，用于实现相机的旋转、缩放和平移控制
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// 创建OrbitControls对象，用于实现相机的旋转、缩放和平移控制
const controls = new OrbitControls(camera, renderer.domElement);

// 创建一个坐标轴辅助对象，长度为5
const axesHelper = new THREE.AxesHelper(5);
// 将坐标轴辅助对象添加到场景中
scene.add(axesHelper);

// 定义一个render函数，用于渲染场景和相机，并递归调用自身以实现动画效果
function render() {
  renderer.render(scene, camera); // 渲染场景和相机
  requestAnimationFrame(render); // 递归调用render函数，实现动画效果
}

// 调用render函数，开始渲染循环
render();
