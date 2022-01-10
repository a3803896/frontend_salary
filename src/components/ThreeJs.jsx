import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import normalMap from '../assets/texture/NormalMap.png';

export default function ThreeJs() {
  const threeRef = useRef();

  useEffect(() => {
    // scene
    const scene = new THREE.Scene();
    // camera
    const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000);
    camera.position.set(0, 0, 2);
    scene.add(camera);
    //renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(threeRef.current.offsetWidth, threeRef.current.offsetWidth * 0.5625);
    // loader
    const loader = new THREE.TextureLoader();
    const normalTexture = loader.load(normalMap, render);
    // resize
    window.addEventListener('resize', () => {
      setTimeout(() => {
        camera.aspect = 16 / 9;
        camera.updateProjectionMatrix();
        renderer.setSize(threeRef.current.offsetWidth, threeRef.current.offsetWidth * 0.5625);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.render(scene, camera);
      }, 0);
    });
    // light
    const pointLight2 = new THREE.PointLight(0xff0000, 1.6);
    pointLight2.position.set(-2.59, 2.81, -1.5);
    scene.add(pointLight2);
    const pointLight3 = new THREE.PointLight(0x509b, 1.6);
    pointLight3.position.set(3.36, -2.75, -0.97);
    scene.add(pointLight3);
    // geometry
    const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    // material
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.2,
      normalMap: normalTexture,
    });
    material.color.set(0xffffff);
    // mesh
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    // render
    function render() {
      renderer.render(scene, camera);
    }
    threeRef.current.appendChild(renderer.domElement);
    render();
    // animate
    function scrollHandler() {
      if (window.innerWidth <= 996) {
        sphere.position.z = window.scrollY * 0.0006;
        if (sphere.position.z >= 1.1) sphere.position.z = 1.1;
      } else {
        sphere.position.z = window.scrollY * 0.0003;
        if (sphere.position.z >= 0.6) sphere.position.z = 0.6;
      }
    }
    function tick() {
      sphere.rotation.y += 0.008;
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    }
    window.addEventListener('scroll', scrollHandler);
    tick();
    // // Debug
    // const gui = new dat.GUI();
    // const light3 = gui.addFolder('light 2');
    // const light3Color = { color: 0xff0000 };
    // light3.add(pointLight3.position, 'x', -6, 6, 0.01);
    // light3.add(pointLight3.position, 'y', -3, 3, 0.01);
    // light3.add(pointLight3.position, 'z', -3, 3, 0.01);
    // light3.add(pointLight3, 'intensity', 0, 2, 0.01);
    // light3.addColor(light3Color, 'color').onChange(() => {
    //   pointLight3.color.set(light3Color.color);
    // });
  }, []);
  return <div ref={threeRef} className='three-js position-fixed'></div>;
}
