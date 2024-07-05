import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from "gsap"
//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64); //(Radius,width segment, height segment)

const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness:0.5,
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 100, 100, 1.6)
light.position.set(0, 10, 10)
scene.add(light)



//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100) //(field of vision, aspect ratio(it is a proportional relationship b/w an image's width and height))
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener('resize', () => {
    //update sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop();

//timeline magic(animations using gasp(green sock animation platform))
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
tl.fromTo('nav', { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 })

//Mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width)),
            Math.round((e.pageY / sizes.height)),
            0.67,
        ]
        //lets animate
        gsap.to(mesh.material.color,{
            r:rgb[0],g:rgb[1],b:rgb[2]
        })

    }
})


