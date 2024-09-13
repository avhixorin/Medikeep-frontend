import React from 'react';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Type definition for the GLTF result
type GLTFResult = {
  scene: THREE.Group;
  nodes: { [key: string]: THREE.Object3D };
  materials: { [key: string]: THREE.Material };
};

// DNA Component
const DNA: React.FC = () => {
  const { scene } = useGLTF('/DNA/dnaModel.glb') as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  // Rotate the model around its local axis (e.g., Y-axis)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Keep rotation in useFrame for smooth animation
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      // Center the model
      const boundingBox = new THREE.Box3().setFromObject(groupRef.current);
      const boxCenter = boundingBox.getCenter(new THREE.Vector3());
      groupRef.current.position.sub(boxCenter);

      // Debugging: Log the model's bounding box and position
      console.log('Bounding Box:', boundingBox);
      console.log('Model Position:', groupRef.current.position);
    }
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.1} />
    </group>
  );
};

// DNAViewer Component
const DNAViewer: React.FC = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={300}
          maxDistance={350}
        />
        
        {/* Adjust ambient light intensity */}
        <ambientLight intensity={0.8} /> {/* Lower intensity for a softer light */}
        
        {/* Adjust directional light */}
        <directionalLight position={[200, 200, 200]} intensity={1.5} /> {/* Lower intensity */}
        
        <PerspectiveCamera
          makeDefault
          position={[0, 1, 10]}
          fov={60}
          near={0.1}
          far={1000}
        />

        <DNA />
      </Suspense>
    </Canvas>
  );
};

export default DNAViewer;
