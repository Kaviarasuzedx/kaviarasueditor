"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CanvasTexture, DoubleSide, Group, MathUtils, Shape, SRGBColorSpace } from "three";

function triangle(a: [number, number], b: [number, number], c: [number, number]) {
  const shape = new Shape();
  shape.moveTo(...a);
  shape.lineTo(...b);
  shape.lineTo(...c);
  shape.closePath();
  return shape;
}

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

/** Entire envelope is procedural: no GLTF models, web fonts or heavy textures. */
export function Envelope() {
  const mainRef = useRef<Group>(null);
  const flapRef = useRef<Group>(null);
  const letterRef = useRef<Group>(null);
  const openingTime = useRef(0);
  const letterTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 600;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textBaseline = "middle";
    context.fillStyle = "#29271f";
    context.font = "700 54px system-ui, sans-serif";
    context.fillText("KAVIARASU", 72, 150);
    context.fillStyle = "#726b5d";
    context.font = "500 27px system-ui, sans-serif";
    context.fillText("VIDEO EDITOR  /  MOTION DESIGNER", 74, 220);
    context.fillStyle = "#c99b37";
    context.fillRect(74, 270, 300, 3);
    context.fillStyle = "#3c392f";
    context.font = "500 31px system-ui, sans-serif";
    context.fillText("kaviarasu6380@gmail.com", 74, 345);
    context.fillStyle = "#8c806b";
    context.font = "500 24px system-ui, sans-serif";
    context.fillText("PONDICHERRY, INDIA", 74, 405);
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, []);
  const upperFlap = useMemo(() => triangle([-1.65, 0], [1.65, 0], [0, -1.11]), []);
  const lowerFlap = useMemo(() => triangle([-1.65, -0.92], [1.65, -0.92], [0, 0.25]), []);
  const leftFold = useMemo(() => triangle([-1.65, 0.88], [-1.65, -0.92], [0, -0.15]), []);
  const rightFold = useMemo(() => triangle([1.65, 0.88], [1.65, -0.92], [0, -0.15]), []);

  useFrame((state, delta) => {
    if (!mainRef.current) return;
    openingTime.current += delta;
    const interactionProgress = easeOutCubic(Math.min(Math.max((openingTime.current - 2) / 0.45, 0), 1));
    mainRef.current.rotation.y = MathUtils.damp(mainRef.current.rotation.y, -0.22 + state.pointer.x * 0.12 * interactionProgress, 3, delta);
    mainRef.current.rotation.x = MathUtils.damp(mainRef.current.rotation.x, 0.08 - state.pointer.y * 0.09 * interactionProgress, 3, delta);

    // The stiff flap opens first. Give it a short settle before the paper moves.
    const flapProgress = Math.min(openingTime.current / 0.85, 1);
    const flapSettleTime = openingTime.current - 0.85;
    const flapSettle = flapSettleTime > 0
      ? Math.sin(flapSettleTime * 15) * Math.exp(-flapSettleTime * 8) * 0.018
      : 0;
    if (flapRef.current) flapRef.current.rotation.x = 3.04 * easeOutCubic(flapProgress) + flapSettle;

    // Keep the original stagger: the letter rises only after the flap opens.
    const letterProgress = Math.min(Math.max((openingTime.current - 0.95) / 1.05, 0), 1);
    const letterSettleTime = openingTime.current - 2;
    const letterSettle = letterSettleTime > 0
      ? Math.sin(letterSettleTime * 14) * Math.exp(-letterSettleTime * 7) * 0.014
      : 0;
    if (letterRef.current) letterRef.current.position.y = 0.35 * easeOutCubic(letterProgress) + letterSettle;

  });

  return (
    <Float speed={1.45} rotationIntensity={0.1} floatIntensity={0.3} floatingRange={[-0.1, 0.1]}>
      <group rotation={[0.07, -0.22, -0.11]} ref={mainRef} scale={1.08}>
        <mesh position={[0, -0.03, 0]} castShadow>
          <boxGeometry args={[3.44, 1.91, 0.15]} />
          <meshStandardMaterial color="#27292d" metalness={0.38} roughness={0.62} />
        </mesh>
        {/* The letter starts inside the pocket and rises after the flap opens. */}
        <group ref={letterRef} position={[0, 0, 0.083]}>
          <mesh>
            <boxGeometry args={[2.95, 1.8, 0.025]} />
            <meshStandardMaterial color="#f1e8d3" metalness={0.02} roughness={0.92} />
          </mesh>
          {letterTexture && <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[2.45, 1.435]} />
            <meshBasicMaterial map={letterTexture} transparent toneMapped={false} />
          </mesh>}
        </group>
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
          <meshStandardMaterial color="#24272d" side={DoubleSide} metalness={0.36} roughness={0.64} />
        </mesh>
        {/* Fine, irregular rub marks give the matte paper surface a tactile finish. */}
        {[
          [-1.12, -0.64, 0.17, -0.22], [-0.86, -0.48, 0.1, 0.3], [-0.55, -0.67, 0.13, -0.36],
          [-0.22, -0.54, 0.08, 0.2], [0.31, -0.68, 0.12, -0.25], [0.62, -0.5, 0.16, 0.28],
          [0.98, -0.68, 0.1, -0.3], [1.2, -0.46, 0.07, 0.2],
        ].map(([x, y, length, angle], index) => (
          <mesh key={`scuff-${index}`} position={[x, y, 0.139]} rotation={[0, 0, angle]}>
            <boxGeometry args={[length, 0.008, 0.003]} />
            <meshBasicMaterial color={index % 2 ? "#777a7d" : "#090b0e"} transparent opacity={0.24} />
          </mesh>
        ))}
        {/* Keep the opening flap behind the letter throughout its movement. */}
        <group ref={flapRef} position={[0, 0.89, -0.08]}>
          <mesh>
            <shapeGeometry args={[upperFlap]} />
            <meshStandardMaterial color="#48474a" side={DoubleSide} metalness={0.34} roughness={0.62} />
          </mesh>
        </group>
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
