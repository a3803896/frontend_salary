import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeJs() {
  const threeRef = useRef();
  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const mesh = useRef(null);
  const controls = useRef(null);
  function setCanvasSize() {
    renderer.current.setSize(threeRef.current.clientWidth, threeRef.current.clientWidth * 0.5625);
  }
  function init() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, 1.77, 0.1, 1000);
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    threeRef.current.appendChild(renderer.current.domElement);
    renderer.current.setPixelRatio(window.devicePixelRatio);
    camera.current.position.z = 5;
    controls.current = new OrbitControls(camera.current, renderer.current.domElement);
  }
  function draw() {
    const geometry = new THREE.PlaneGeometry(5, 5, 10, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0xee1111, side: 2, flatShading: true });
    mesh.current = new THREE.Mesh(geometry, material);
    const { array } = mesh.current.geometry.attributes.position;
    for (let i = 2; i < array.length; i += 3) {
      array[i] += Math.random();
    }
    scene.current.add(mesh.current);
    renderer.current.render(scene.current, camera.current);
    controls.current.addEventListener('change', () => {
      renderer.current.render(scene.current, camera.current);
    });
    // window.requestAnimationFrame(animate);
  }
  function lightUp() {
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(0, 0, 1);
    scene.current.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(0, 0, -1);
    scene.current.add(light2);
  }
  function animate() {
    if (!mesh.current) return;
    window.requestAnimationFrame(animate);
    renderer.current.render(scene.current, camera.current);
    mesh.current.rotation.x += 0.01;
  }
  function change(data) {
    mesh.current.geometry.dispose();
    mesh.current.geometry = new THREE.PlaneGeometry(data.width, data.height, data.xFregment, data.yFregment);
    const { array } = mesh.current.geometry.attributes.position;
    for (let i = 2; i < array.length; i += 3) {
      array[i] += Math.random();
    }
    scene.current.add(mesh.current);
    renderer.current.render(scene.current, camera.current);
  }
  function createGUI() {
    const gui = new dat.GUI();
    const data = { width: 5, height: 5, xFregment: 10, yFregment: 10 };
    gui.add(data, 'width', 1, 10).onChange(() => change(data));
    gui.add(data, 'height', 1, 10).onChange(() => change(data));
    gui.add(data, 'xFregment', 5, 25).onChange(() => change(data));
    gui.add(data, 'yFregment', 5, 25).onChange(() => change(data));
  }

  useEffect(() => {
    init();
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    lightUp();
    draw();
    createGUI();
  }, []);
  return <div ref={threeRef} className='three-js'></div>;
}
