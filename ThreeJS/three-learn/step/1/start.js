import * as THREE from 'three'

const renderCube = () => {
    // 获取屏幕宽高
    const width = window.innerWidth,
        height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // 物体
    // geometry 骨架
    // material 材质
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // 添加至场景 默认位置为 [0, 0, 0]

    // 光线
    const light = new THREE.AmbientLight();
    scene.add(light);

    // 摄像机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(0, 0, 5); // x, y, z (x, 水平线，y 垂直线，z 垂直于屏幕) (与 rgb 对应)
    camera.lookAt(cube.position); // 注意位置 可以是 [x, y, z] 位置数组，也可以对象位置

    // 渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera); // 注意场景与摄像机的关系

    document.body.append(renderer.domElement);
}

export default renderCube;
