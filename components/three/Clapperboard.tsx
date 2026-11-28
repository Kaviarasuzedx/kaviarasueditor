"use client";

import { Float } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, MathUtils, SRGBColorSpace } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

class SlateGeometry extends RoundedBoxGeometry {
  constructor(width: number, height: number, depth: number, radius: number) {
    super(width, height, depth, 3, radius);
    // The printed artwork belongs only to the front (+Z) face.
    this.groups.forEach((group, face) => {
      group.materialIndex = face === 4 ? 1 : 0;
    });
  }
}

const BeveledBox = extend(SlateGeometry);

const slate = "#25272a";
const stick = "#191a1c";
const ink = "#dedbd1";
const width = 3.6;
const armRestAngle = 0.225;

function paint(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (context) draw(context);
  return canvas;
}

function paintSlate(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = slate;
  ctx.fillRect(0, 0, 1024, 624);
  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(44, 42, 936, 540);

  for (const y of [142, 274, 374, 474]) {
    ctx.beginPath();
    ctx.moveTo(44, y);
    ctx.lineTo(980, y);
    ctx.stroke();
  }
  for (const x of [356, 668]) {
    ctx.beginPath();
    ctx.moveTo(x, 142);
    ctx.lineTo(x, 274);
    ctx.stroke();
  }

  ctx.textAlign = "center";
  ctx.font = "bold 35px sans-serif";
  ctx.fillText("KAVIARASU FILMS", 512, 111);
  ctx.textAlign = "start";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("ROLL", 66, 176);
  ctx.fillText("SCENE", 378, 176);
  ctx.fillText("TAKE", 690, 176);
  ctx.fillText("DIRECTOR", 66, 311);
  ctx.fillText("CAMERA", 66, 411);
  ctx.fillText("DATE", 66, 511);
}

function paintStick(ctx: CanvasRenderingContext2D, lean: number) {
  ctx.fillStyle = stick;
  ctx.fillRect(0, 0, 1024, 112);
  ctx.save();
  ctx.beginPath();
  ctx.rect(12, 0, 1000, 112);
  ctx.clip();
  ctx.fillStyle = "#e8e5db";
  for (let x = 30; x < 1024; x += 164) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 85, 0);
    ctx.lineTo(x + 85 + lean, 112);
    ctx.lineTo(x + lean, 112);
    ctx.fill();
  }
  ctx.restore();
}

export function Clapperboard({ onReady }: { onReady: () => void }) {
  const outer = useRef<Group>(null);
  const arm = useRef<Group>(null);
  const hasRendered = useRef(false);
  const [face, lowerStripes, upperStripes] = useMemo(() => [
    paint(1024, 624, paintSlate),
    paint(1024, 112, (ctx) => paintStick(ctx, -54)),
    paint(1024, 112, (ctx) => paintStick(ctx, 54)),
  ], []);

  useFrame((state, delta) => {
    if (!outer.current || !arm.current) return;
    const targetY = -0.27 + state.pointer.x * 0.14;
    const targetX = -0.08 - state.pointer.y * 0.10;
    outer.current.rotation.y = MathUtils.damp(outer.current.rotation.y, targetY, 2.5, delta);
    outer.current.rotation.x = MathUtils.damp(outer.current.rotation.x, targetX, 2.5, delta);
    arm.current.rotation.z = armRestAngle + Math.sin(state.clock.elapsedTime * 1.25) * 0.045;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.2} floatingRange={[-0.07, 0.07]}>
      <group ref={outer} rotation={[-0.08, -0.27, -0.09]}>
        <mesh
          position={[0, -0.34, 0]}
          onAfterRender={() => {
            if (!hasRendered.current) {
              hasRendered.current = true;
              onReady();
            }
          }}
        >
          <BeveledBox args={[width, 2.2, 0.22, 0.035]} />
          <meshStandardMaterial attach="material-0" color={slate} roughness={0.78} />
          <meshStandardMaterial attach="material-1" roughness={0.78}>
            <canvasTexture attach="map" args={[face]} colorSpace={SRGBColorSpace} anisotropy={8} />
          </meshStandardMaterial>
        </mesh>
        <mesh position={[0, 0.935, 0]}>
          <BeveledBox args={[width, 0.38, 0.29, 0.025]} />
          <meshStandardMaterial attach="material-0" color={stick} roughness={0.55} />
          <meshStandardMaterial attach="material-1" roughness={0.55}>
            <canvasTexture attach="map" args={[lowerStripes]} colorSpace={SRGBColorSpace} anisotropy={8} />
          </meshStandardMaterial>
        </mesh>
        <group ref={arm} position={[-1.69, 1.17, 0]} rotation={[0, 0, armRestAngle]}>
          <mesh position={[1.69, 0.19, 0]}>
            <BeveledBox args={[width, 0.38, 0.29, 0.025]} />
            <meshStandardMaterial attach="material-0" color="#292823" roughness={0.55} />
            <meshStandardMaterial attach="material-1" roughness={0.55}>
              <canvasTexture attach="map" args={[upperStripes]} colorSpace={SRGBColorSpace} anisotropy={8} />
            </meshStandardMaterial>
          </mesh>
        </group>
        <mesh position={[-1.63, 1.09, 0.16]}>
          <BeveledBox args={[0.31, 0.54, 0.064, 0.027]} />
          <meshStandardMaterial color="#343538" metalness={0.68} roughness={0.39} />
        </mesh>
        {[0.94, 1.22].map((y) => (
          <mesh key={y} position={[-1.63, y, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.063, 0.063, 0.038, 24]} />
            <meshStandardMaterial color="#a4a29b" metalness={0.76} roughness={0.32} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
