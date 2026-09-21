"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Satin as a landscape: two sheets of glossy dark cloth in broad, soft folds,
 * rolling away from the camera into the dark. A low light drifts across them so
 * long highlights slide along the folds. No texture noise: the quality comes
 * from smooth surfaces, a coated sheen and the light. Sits low in a section,
 * with frosted panels overlapping its upper half.
 */

interface Cloth {
  color: string;
  sheenColor: string;
  y: number;
  z: number;
  /** Phase offset so the two sheets fold differently. */
  seed: number;
  /** Height of the broad fold. */
  swell: number;
  /** Height of the secondary, tighter fold laid over it. */
  pleat: number;
}

const CLOTHS: Cloth[] = [
  { color: "#080b24", sheenColor: "#3a4bd0", y: -1.8, z: -6, seed: 2.4, swell: 1.7, pleat: 0.6 },
  { color: "#0f1a78", sheenColor: "#7d92ff", y: -2.5, z: -0.5, seed: 0, swell: 1.25, pleat: 0.45 },
];

const WIDTH = 46;
const DEPTH = 20;
const SEG_X = 220;
const SEG_Z = 90;

function height(x: number, z: number, c: Cloth): number {
  const warp = 0.7 * Math.sin(x * 0.23 + c.seed * 1.3) + 0.4 * Math.sin(z * 0.31 + c.seed);
  const broad = c.swell * Math.sin(x * 0.33 + z * 0.42 + c.seed + warp);
  const cross = c.swell * 0.45 * Math.sin(x * 0.58 - z * 0.3 + c.seed * 1.9 + warp * 1.4);
  const fine = c.pleat * Math.sin(x * 1.05 + z * 0.6 + c.seed * 2.6 + warp * 2);
  return broad + cross + fine * 0.5;
}

function clothGeometry(c: Cloth): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(WIDTH, DEPTH, SEG_X, SEG_Z);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, height(pos.getX(i), pos.getZ(i), c));
  }
  geo.computeVertexNormals();
  return geo;
}

interface Built {
  group: THREE.Group;
  dispose: () => void;
}

function buildFabric(): Built {
  const group = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];
  for (const c of CLOTHS) {
    const geo = clothGeometry(c);
    const mat = new THREE.MeshPhysicalMaterial({
      color: c.color,
      roughness: 0.38,
      metalness: 0.2,
      clearcoat: 0.7,
      clearcoatRoughness: 0.28,
      sheen: 0.7,
      sheenColor: new THREE.Color(c.sheenColor),
      sheenRoughness: 0.35,
      envMapIntensity: 0.6,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, c.y, c.z);
    group.add(mesh);
    disposables.push(geo, mat);
  }

  return { group, dispose: () => disposables.forEach((d) => d.dispose()) };
}

/** Soft studio reflections, so the satin has something to reflect besides the two lights. */
function Studio() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.5;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Fabric({ still }: { still: boolean }) {
  const built = useMemo(buildFabric, []);
  const key = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.DirectionalLight>(null);

  useEffect(() => () => built.dispose(), [built]);

  useFrame(({ clock }) => {
    if (still) return;
    const t = clock.elapsedTime;
    // The key light sweeps slowly across the folds so highlights slide along them; the cool rim answers it.
    key.current?.position.set(Math.sin(t * 0.22) * 9, 3.2, 3);
    rim.current?.position.set(Math.sin(t * 0.22 + 2.4) * 9, 2.4, -6);
  });

  return (
    <>
      <directionalLight ref={key} position={[-6, 3.2, 3]} intensity={3.4} color="#c7d0ff" />
      <directionalLight ref={rim} position={[6, 2.4, -6]} intensity={2.2} color="#4a5fe0" />
      <primitive object={built.group} />
    </>
  );
}

export default function FabricScene({ still = false, paused = false }: { still?: boolean; paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 1.5, 9], fov: 40, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={still || paused ? "demand" : "always"}
      onCreated={({ camera }) => camera.lookAt(0, -1.4, -2)}
    >
      {/* Distant fabric dissolves into the section's own background colour. */}
      <fog attach="fog" args={["#08090c", 9, 24]} />
      <Studio />
      <ambientLight intensity={0.08} />
      <Fabric still={still} />
    </Canvas>
  );
}
