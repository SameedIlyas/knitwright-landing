"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The Knitwright mark as a polished 3D object: two beveled pieces, the cut
 * stroke in cobalt chrome and the blade in pearl, floating and turning slowly.
 * Reflections come from a small studio built for the purpose (a bright top
 * softbox, a cool strip and a warm strip), so the metal reads as a product
 * render rather than a flat shape.
 */

const K = 0.02; // logo units to world units
const CX = 91.5;
const CY = 81.5;

/** The two pieces of the mark, in the logo's own coordinates (y down). */
const STROKE: [number, number][] = [
  [0, 0],
  [183, 0],
  [155, 37],
];
const BLADE: [number, number][] = [
  [106, 46],
  [147, 46],
  [57, 163],
];

function shapeOf(points: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const px = (x - CX) * K;
    const py = -(y - CY) * K;
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.26,
  bevelEnabled: true,
  bevelThickness: 0.07,
  bevelSize: 0.05,
  bevelSegments: 12,
  curveSegments: 1,
};

/** A small photo studio, rendered once into an environment map for the metal to reflect. */
function studioEnvironment(gl: THREE.WebGLRenderer): THREE.Texture {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#07080c");
  const panel = (w: number, h: number, at: [number, number, number], color: string, power: number) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide, toneMapped: false }),
    );
    mesh.position.set(...at);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };
  // A fan of strips across the front. As the mark turns, its faces sweep across them,
  // so the metal flashes bright, coloured and dark in bands, the way chrome does.
  const strip = (azimuthDeg: number, height: number, color: string, power: number, width = 1.7) => {
    const az = (azimuthDeg * Math.PI) / 180;
    panel(width, 11, [Math.sin(az) * 8, height, Math.cos(az) * 8], color, power);
  };
  strip(-78, 0, "#4a63ff", 5);
  strip(-52, 0, "#ffffff", 4.5, 2.4);
  strip(-24, 0, "#9fb0ff", 2.2, 1.2);
  strip(8, 0, "#ffffff", 3.5, 1.6);
  strip(34, 0, "#ffb8d6", 5, 2);
  strip(60, 0, "#ffffff", 4.5, 2.4);
  strip(82, 0, "#3d58ff", 5);
  panel(10, 3, [0, 6.5, 2], "#ffffff", 5); // top softbox, for the upper bevels
  panel(8, 2, [0, -5.5, 3], "#7f92ff", 2.5); // low fill, for the lower bevels
  const pmrem = new THREE.PMREMGenerator(gl);
  const texture = pmrem.fromScene(scene, 0.02).texture;
  pmrem.dispose();
  scene.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });
  return texture;
}

function Studio() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const env = studioEnvironment(gl);
    scene.environment = env;
    scene.environmentIntensity = 1;
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Mark({ still }: { still: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();
  const scale = Math.min(1.1, viewport.width / 5.6);

  const parts = useMemo(() => {
    const centre = (g: THREE.BufferGeometry) => {
      g.translate(0, 0, -(EXTRUDE.depth ?? 0) / 2);
      return g;
    };
    return {
      stroke: centre(new THREE.ExtrudeGeometry(shapeOf(STROKE), EXTRUDE)),
      blade: centre(new THREE.ExtrudeGeometry(shapeOf(BLADE), EXTRUDE)),
    };
  }, []);
  useEffect(() => () => Object.values(parts).forEach((g) => g.dispose()), [parts]);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime;
    const sway = still ? -0.4 : Math.sin(t * 0.5) * 0.75;
    g.rotation.y += (sway + pointer.x * 0.35 - g.rotation.y) * 0.06;
    g.rotation.x += (-pointer.y * 0.2 + (still ? 0.1 : Math.sin(t * 0.37) * 0.08) - g.rotation.x) * 0.06;
    g.position.y = still ? 0 : Math.sin(t * 0.8) * 0.07;
  });

  return (
    <group ref={ref} scale={scale}>
      <mesh geometry={parts.stroke}>
        <meshPhysicalMaterial
          color="#3d58ff"
          metalness={1}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.06}
          iridescence={0.55}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[150, 520]}
        />
      </mesh>
      <mesh geometry={parts.blade}>
        <meshPhysicalMaterial
          color="#c9d0ee"
          metalness={1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.06}
          iridescence={0.5}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[150, 520]}
        />
      </mesh>
    </group>
  );
}

export default function MarkScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : "always"}
    >
      <Studio />
      <Mark still={still} />
    </Canvas>
  );
}
