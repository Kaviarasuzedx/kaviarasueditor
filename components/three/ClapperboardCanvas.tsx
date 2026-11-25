"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Clapperboard } from "./Clapperboard";

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.z = size.width < 480 ? 8.2 : 6.8;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

export default function ClapperboardCanvas({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      aria-label=""
      aria-hidden="true"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, 6.8], fov: 39, near: 0.1, far: 30 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={onReady}
      shadows={false}
      style={{ background: "transparent" }}
    >
      <ResponsiveCamera />
      <ambientLight intensity={1.9} />
      <directionalLight position={[3, 5, 7]} intensity={3.6} color="#fff5dd" />
      <pointLight position={[-4, -2, 5]} intensity={55} distance={12} color="#ffb800" />
      <pointLight position={[3, 0, -1]} intensity={16} distance={10} color="#7c85a0" />
      <Suspense fallback={null}>
        <Clapperboard />
      </Suspense>
    </Canvas>
  );
}
