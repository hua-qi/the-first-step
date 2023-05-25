/*
 * @Description  : 动起来
 * @Author       : lianzimeng
 * @Date         : 2023-05-25 23:06:24
 * @LastEditors  : lianzimeng
 * @LastEditTime : 2023-05-25 23:33:25
 */
import * as THREE from 'three'

const cubeTransform = () => {
    // 获取屏幕宽高
    const width = window.innerWidth,
        height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Object
    // 辅助线
    const axes = new THREE.AxesHelper(2, 2, 2); // rgb
    scene.add(axes);
    
    // geometry 骨架
    // material 材质
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // 添加至场景 默认位置为 [0, 0, 0]

    // transform
    /*
    position

    cube.position.x = -1; 
    cube.position.y = -1; 
    cube.position.z = -1;
    cube.position.set(1, 1, 1); 
     */

    /*
    rotation
    
    cube.rotation.x = 45 / 180 * Math.PI;
    cube.rotation.y = 45 / 180 * Math.PI;
    cube.rotation.z = 45 / 180 * Math.PI;
     */
    
    /*
    scale

    cube.scale.x = 2; 
    cube.scale.y = 2; 
    cube.scale.z = 2; 
    cube.scale.set(2, 2, 2);
    */
    // Light 基础材质物体不需要 光线也可以显示

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(0, 0, 5); // x, y, z (x, 水平线，y 垂直线，z 垂直于屏幕) (与 rgb 对应)
    camera.lookAt(cube.position); // 注意位置 可以是 [x, y, z] 位置数组，也可以对象位置

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera); // 注意场景与摄像机的关系

    document.body.append(renderer.domElement);
}

export default cubeTransform;