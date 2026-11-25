"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Envelope } from "./Envelope";

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.z = size.width < 480 ? 7.8 : 6.3;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

export default function EnvelopeCanvas({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 6.3], fov: 40, near: 0.1, far: 20 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={onReady}
      shadows={false}
      style={{ background: "transparent" }}
    >
      <ResponsiveCamera />
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 4, 6]} intensity={3.8} color="#fff3da" />
      <pointLight position={[-3, -2, 4]} intensity={45} distance={12} color="#ffb800" />
      <Suspense fallback={null}><Envelope /></Suspense>
    </Canvas>
  );
}
