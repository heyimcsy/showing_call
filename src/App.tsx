import * as THREE from 'three';
import './App.css';
import { useEffect, useRef } from 'react';
import * as React from 'react';

function App(): React.JSX.Element {
	const mountRef: React.Ref<HTMLDivElement | null> =
		useRef<HTMLDivElement | null>(null);
	const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
		antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.outputColorSpace = THREE.sR
	renderer.shadowMap.enabled = true;

	const scene: THREE.Scene = new THREE.Scene();
	const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);
	camera.position.z = 5;

	const init_animate = (): void => {
		renderer.render(scene, camera);
	};
	useEffect(() => {
		if (!mountRef.current) return;

		mountRef.current.appendChild(renderer.domElement);
		init_animate();

		// 4. 정리(clean-up) 함수
		return () => {
			mountRef.current?.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={mountRef} />;
}

export default App;
