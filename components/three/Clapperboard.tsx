"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils } from "three";

const dark = "#191c22";
const graphite = "#2c2f35";
const cream = "#f3ede1";
const amber = "#ffb800";

/** Procedural low-poly hero prop: no external models or textures. */
export function Clapperboard() {
  const outer = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!outer.current) return;
    const targetY = -0.32 + state.pointer.x * 0.16;
    const targetX = -0.08 - state.pointer.y * 0.12;
    outer.current.rotation.y = MathUtils.damp(outer.current.rotation.y, targetY, 2.5, delta);
    outer.current.rotation.x = MathUtils.damp(outer.current.rotation.x, targetX, 2.5, delta);
  });

  return (
    <Float speed={1.7} rotationIntensity={0.12} floatIntensity={0.38} floatingRange={[-0.13, 0.13]}>
      <group ref={outer} rotation={[-0.08, -0.32, -0.12]} scale={1.13}>
        {/* Slate board body */}
        <mesh position={[0, -0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.55, 2.25, 0.22]} />
          <meshStandardMaterial color={dark} metalness={0.65} roughness={0.28} />
        </mesh>
        <mesh position={[0, -0.28, 0.12]}>
          <boxGeometry args={[3.35, 2.05, 0.012]} />
          <meshStandardMaterial color={graphite} roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Fine framing lines, purely geometric */}
        {[-0.72, -0.24, 0.24, 0.72].map((y) => (
          <mesh key={y} position={[0, y - 0.32, 0.132]}>
            <boxGeometry args={[2.87, 0.012, 0.01]} />
            <meshBasicMaterial color="#5a5b60" />
          </mesh>
        ))}
        <mesh position={[-1.17, -0.34, 0.14]}>
          <boxGeometry args={[0.022, 1.65, 0.009]} />
          <meshBasicMaterial color={amber} />
        </mesh>
        {/* Lower hinge + clapper arm */}
        <mesh position={[0, 0.94, 0.05]} castShadow>
          <boxGeometry args={[3.64, 0.38, 0.29]} />
          <meshStandardMaterial color="#20232a" metalness={0.7} roughness={0.28} />
        </mesh>
        <group position={[-1.62, 1.11, 0.05]} rotation={[0, 0, 0.25]}>
          <mesh position={[1.62, 0.13, 0]} castShadow>
            <boxGeometry args={[3.64, 0.4, 0.29]} />
            <meshStandardMaterial color={cream} metalness={0.34} roughness={0.38} />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} position={[0.21 + i * 0.56, 0.13, 0.161]} rotation={[0, 0, -0.43]}>
              <boxGeometry args={[0.29, 0.48, 0.015]} />
              <meshStandardMaterial color={dark} />
            </mesh>
          ))}
        </group>
        <mesh position={[-1.63, 0.99, 0.2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.39, 16]} />
          <meshStandardMaterial color={amber} metalness={0.75} roughness={0.2} />
        </mesh>
        {/* Decorative bezel detail */}
        <mesh position={[1.42, -1.07, 0.146]}>
          <boxGeometry args={[0.5, 0.05, 0.01]} />
          <meshBasicMaterial color={amber} />
        </mesh>
      </group>
    </Float>
  );
}
