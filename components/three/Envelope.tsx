"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, Group, MathUtils, Shape } from "three";

function triangle(a: [number, number], b: [number, number], c: [number, number]) {
  const shape = new Shape();
  shape.moveTo(...a);
  shape.lineTo(...b);
  shape.lineTo(...c);
  shape.closePath();
  return shape;
}

/** Entire envelope is procedural: no GLTF models, web fonts or heavy textures. */
export function Envelope() {
  const mainRef = useRef<Group>(null);
  const upperFlap = useMemo(() => triangle([-1.65, 0.89], [1.65, 0.89], [0, -0.22]), []);
  const lowerFlap = useMemo(() => triangle([-1.65, -0.92], [1.65, -0.92], [0, 0.25]), []);
  const leftFold = useMemo(() => triangle([-1.65, 0.88], [-1.65, -0.92], [0, -0.15]), []);
  const rightFold = useMemo(() => triangle([1.65, 0.88], [1.65, -0.92], [0, -0.15]), []);

  useFrame((state, delta) => {
    if (!mainRef.current) return;
    mainRef.current.rotation.y = MathUtils.damp(mainRef.current.rotation.y, -0.22 + state.pointer.x * 0.12, 3, delta);
    mainRef.current.rotation.x = MathUtils.damp(mainRef.current.rotation.x, 0.08 - state.pointer.y * 0.09, 3, delta);
  });

  return (
    <Float speed={1.45} rotationIntensity={0.1} floatIntensity={0.3} floatingRange={[-0.1, 0.1]}>
      <group rotation={[0.07, -0.22, -0.11]} ref={mainRef} scale={1.08}>
        <mesh position={[0, -0.03, 0]} castShadow>
          <boxGeometry args={[3.44, 1.91, 0.15]} />
          <meshStandardMaterial color="#27292d" metalness={0.67} roughness={0.26} />
        </mesh>
        {/* Letter visible behind the front-folds */}
        <mesh position={[0, 0.39, 0.083]}>
          <boxGeometry args={[2.95, 1.8, 0.025]} />
          <meshStandardMaterial color="#f1e8d3" metalness={0.08} roughness={0.73} />
        </mesh>
        {[0, 1, 2].map((index) => (
          <mesh key={index} position={[-0.29, 0.74 - index * 0.22, 0.103]}>
            <boxGeometry args={[1.65 - index * 0.18, 0.028, 0.01]} />
            <meshBasicMaterial color="#9b9485" />
          </mesh>
        ))}
        {/* The dark envelope front is four overlapping low-poly triangles */}
        <mesh position={[0, 0, 0.12]}>
          <shapeGeometry args={[leftFold]} />
          <meshStandardMaterial color="#373b40" side={DoubleSide} metalness={0.56} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.122]}>
          <shapeGeometry args={[rightFold]} />
          <meshStandardMaterial color="#34373d" side={DoubleSide} metalness={0.54} roughness={0.32} />
        </mesh>
        <mesh position={[0, 0, 0.129]}>
          <shapeGeometry args={[lowerFlap]} />
          <meshStandardMaterial color="#24272d" side={DoubleSide} metalness={0.63} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0, 0.133]}>
          <shapeGeometry args={[upperFlap]} />
          <meshStandardMaterial color="#48474a" side={DoubleSide} metalness={0.58} roughness={0.3} />
        </mesh>
        {/* Amber wax seal */}
        <mesh position={[0, -0.26, 0.20]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.065, 24]} />
          <meshStandardMaterial color="#ffb800" metalness={0.75} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.26, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.014, 6, 25]} />
          <meshBasicMaterial color="#1c1b16" />
        </mesh>
        <mesh position={[0, -0.26, 0.25]}>
          <boxGeometry args={[0.07, 0.07, 0.008]} />
          <meshBasicMaterial color="#1c1b16" />
        </mesh>
      </group>
    </Float>
  );
}
