"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { ACESFilmicToneMapping } from "three";
import { Clapperboard } from "./Clapperboard";

const cameraDistance = 7.45;

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!size.width || !size.height) return;
    // Reserve space for the raised tip at maximum opening and pointer tilt.
    const aspect = size.width / size.height;
    camera.position.z = cameraDistance / Math.min(aspect, 1);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

export default function ClapperboardCanvas({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 2]}
      camera={{ position: [0, 0.33, cameraDistance], rotation: [0, 0, 0], fov: 39, near: 0.1, far: 50 }}
      gl={{ alpha: true, antialias: true, toneMapping: ACESFilmicToneMapping }}
      style={{ background: "transparent" }}
    >
      <ResponsiveCamera />
      <hemisphereLight args={["#e1e8f5", "#33271e", 0.65]} />
      <directionalLight position={[-3, 5, 5]} intensity={2} color="#fff1dc" />
      <directionalLight position={[4, 2, -3]} intensity={1.5} color="#ccd9ef" />
      <Environment resolution={128} environmentIntensity={0.65}>
        <Lightformer form="rect" intensity={2.5} position={[-3, 3, 4]} scale={[5, 3, 1]} target={[0, 0, 0]} color="#fff1dc" />
        <Lightformer form="rect" intensity={1.4} position={[4, 1, 1]} scale={[2, 5, 1]} target={[0, 0, 0]} color="#dce7ff" />
      </Environment>
      <Clapperboard onReady={onReady} />
    </Canvas>
  );
}
