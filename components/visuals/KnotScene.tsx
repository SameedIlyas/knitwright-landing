"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The hero object: a slow-turning knot in dark knitted satin — Knitwright's "yarn".
 * Fully procedural. The rib texture is drawn on a canvas and used as a bump map,
 * so the tube reads as knitted rib rather than plastic.
 */
function ribTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const g = c.getContext("2d")!;
  for (let x = 0; x < c.width; x += 1) {
    // Knit stitches: a chevron rib repeated along the tube.
    const v = 0.5 + 0.5 * Math.sin((x / c.width) * Math.PI * 2 * 128);
    const shade = Math.round(90 + v * 140);
    g.fillStyle = `rgb(${shade},${shade},${shade})`;
    g.fillRect(x, 0, 1, c.height);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 1);
  return t;
}

function Knot({ still }: { still: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();
  const bump = useMemo(() => ribTexture(), []);
  const scale = Math.min(0.86, viewport.width / 8.5);

  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    if (!still) {
      m.rotation.y += dt * 0.12;
      m.rotation.z += dt * 0.035;
    }
    // Ease toward the pointer for a gentle parallax.
    m.rotation.x += (pointer.y * 0.25 + 0.35 - m.rotation.x) * 0.04;
    m.position.x += (pointer.x * 0.2 - m.position.x) * 0.04;
  });

  return (
    <mesh ref={ref} scale={scale} rotation={[0.35, 0, 0]}>
      <torusKnotGeometry args={[1.5, 0.5, 360, 64, 2, 3]} />
      <meshPhysicalMaterial
        color="#1a1b1f"
        roughness={0.55}
        metalness={0.1}
        sheen={0.55}
        sheenRoughness={0.5}
        sheenColor="#7c86c9"
        clearcoat={0.25}
        clearcoatRoughness={0.5}
        bumpMap={bump}
        bumpScale={0.9}
      />
    </mesh>
  );
}

export default function KnotScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : "always"}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={2.4} />
      <directionalLight position={[-6, -2, 2]} intensity={0.9} color="#c9d2ff" />
      <pointLight position={[0, -4, 3]} intensity={10} color="#ffd9ea" />
      <Knot still={still} />
    </Canvas>
  );
}
