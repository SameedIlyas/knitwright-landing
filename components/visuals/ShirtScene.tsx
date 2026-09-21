"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * A procedural sportswear tee: a raglan crew in white with cobalt sleeves, an ink
 * rib collar and the Knitwright mark on the chest. No model files. The shirt
 * outline is drawn once on a canvas; that drawing gives the cut-out (alpha), a
 * distance-from-edge field that pillows the front and back panels into a
 * garment with thickness, and the painted fabric colour.
 */

const MAP = 1024; // painted texture, px
const FIELD = 256; // distance field, px
const GRID = 200; // vertex grid per panel
const SIZE = 3; // world size of the square the shirt is drawn in
const DEPTH = 0.2; // how far each panel bulges from centre
const EDGE = 15; // field px over which the bulge rounds off
const WRAP = 0.34; // how far the sides curl back, as around a torso

const MARK = "M0 0H183L155 37ZM106 46H147L57 163Z";
const COBALT = "#2b46f0";
const INK = "#14161b";

/** The shirt silhouette in MAP space, symmetric about x = 512. */
function outline(): Path2D {
  const p = new Path2D();
  p.moveTo(402, 110);
  p.bezierCurveTo(430, 205, 594, 205, 622, 110); // scoop neck
  p.lineTo(776, 160); // right shoulder
  p.lineTo(950, 335); // right sleeve, outer
  p.lineTo(838, 440); // right cuff
  p.lineTo(742, 372); // right armpit
  p.bezierCurveTo(734, 520, 730, 700, 738, 905); // right side seam
  p.quadraticCurveTo(512, 930, 286, 905); // hem
  p.bezierCurveTo(294, 700, 290, 520, 282, 372); // left side seam
  p.lineTo(186, 440);
  p.lineTo(74, 335);
  p.lineTo(248, 160);
  p.closePath();
  return p;
}

function canvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return [c, c.getContext("2d")!];
}

/** White-on-black cut-out, read through the green channel as the alpha map. */
function maskCanvas(size: number): HTMLCanvasElement {
  const [c, g] = canvas(size);
  g.fillStyle = "#000";
  g.fillRect(0, 0, size, size);
  g.scale(size / MAP, size / MAP);
  g.fillStyle = "#fff";
  g.fill(outline());
  return c;
}

/** Straight-line distance (in px) from each inside pixel to the nearest outside pixel. */
function distanceField(inside: Uint8Array, n: number): Float32Array {
  const d = new Float32Array(n * n);
  for (let i = 0; i < d.length; i++) d[i] = inside[i] ? 1e6 : 0;
  const D = Math.SQRT2;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const i = y * n + x;
      if (!inside[i]) continue;
      let v = d[i];
      if (x > 0) v = Math.min(v, d[i - 1] + 1);
      if (y > 0) {
        v = Math.min(v, d[i - n] + 1);
        if (x > 0) v = Math.min(v, d[i - n - 1] + D);
        if (x < n - 1) v = Math.min(v, d[i - n + 1] + D);
      }
      d[i] = v;
    }
  }
  for (let y = n - 1; y >= 0; y--) {
    for (let x = n - 1; x >= 0; x--) {
      const i = y * n + x;
      if (!inside[i]) continue;
      let v = d[i];
      if (x < n - 1) v = Math.min(v, d[i + 1] + 1);
      if (y < n - 1) {
        v = Math.min(v, d[i + n] + 1);
        if (x < n - 1) v = Math.min(v, d[i + n + 1] + D);
        if (x > 0) v = Math.min(v, d[i + n - 1] + D);
      }
      d[i] = v;
    }
  }
  return d;
}

function boxBlur(src: Float32Array, n: number): Float32Array {
  const out = new Float32Array(src.length);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let sum = 0;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
          sum += src[yy * n + xx];
          count++;
        }
      }
      out[y * n + x] = sum / count;
    }
  }
  return out;
}

/** Bulge height per field pixel: a rounded rim that flattens to a soft plateau, with faint folds. */
function heightField(): Float32Array {
  const [c, g] = canvas(FIELD);
  g.scale(FIELD / MAP, FIELD / MAP);
  g.fillStyle = "#fff";
  g.fill(outline());
  const px = g.getImageData(0, 0, FIELD, FIELD).data;
  const inside = new Uint8Array(FIELD * FIELD);
  for (let i = 0; i < inside.length; i++) inside[i] = px[i * 4 + 3] > 127 ? 1 : 0;
  void c;

  const dist = distanceField(inside, FIELD);
  const h = new Float32Array(dist.length);
  for (let y = 0; y < FIELD; y++) {
    for (let x = 0; x < FIELD; x++) {
      const i = y * FIELD + x;
      const t = Math.min(dist[i] / EDGE, 1);
      const rim = Math.sqrt(1 - (1 - t) * (1 - t));
      // Low folds that gather towards the hem and under the arms.
      const fold = t > 0.6 ? 0.045 * Math.sin(x * 0.34 + y * 0.11) * Math.sin(y * 0.09) : 0;
      h[i] = inside[i] ? rim + fold : 0;
    }
  }
  return boxBlur(boxBlur(h, FIELD), FIELD);
}

function sample(field: Float32Array, u: number, v: number): number {
  const x = Math.min(Math.max(u, 0), 1) * (FIELD - 1);
  const y = Math.min(Math.max(1 - v, 0), 1) * (FIELD - 1);
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, FIELD - 1);
  const y1 = Math.min(y0 + 1, FIELD - 1);
  const fx = x - x0;
  const fy = y - y0;
  const top = field[y0 * FIELD + x0] * (1 - fx) + field[y0 * FIELD + x1] * fx;
  const bottom = field[y1 * FIELD + x0] * (1 - fx) + field[y1 * FIELD + x1] * fx;
  return top * (1 - fy) + bottom * fy;
}

/** One panel of the shirt. `side` +1 is the front, -1 the back (winding reversed to face outward). */
function panelGeometry(field: Float32Array, side: 1 | -1): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, GRID, GRID);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    const wrap = WRAP * (2 * u - 1) ** 2;
    pos.setZ(i, side * sample(field, u, v) * DEPTH - wrap);
  }
  if (side === -1) {
    const idx = geo.index!;
    for (let i = 0; i < idx.count; i += 3) {
      const a = idx.getX(i + 1);
      idx.setX(i + 1, idx.getX(i + 2));
      idx.setX(i + 2, a);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

/** Painted fabric. The back is drawn mirrored so its mark reads correctly seen from behind. */
function fabricCanvas(front: boolean): HTMLCanvasElement {
  const [c, g] = canvas(MAP);
  if (!front) {
    g.translate(MAP, 0);
    g.scale(-1, 1);
  }

  const body = g.createLinearGradient(0, 100, 0, 930);
  body.addColorStop(0, "#f7f8fb");
  body.addColorStop(1, "#d9dce6");
  g.fillStyle = body;
  g.fillRect(0, 0, MAP, MAP);

  // Raglan sleeves in ink, split at the seam running from collar to armpit.
  const sleeve = (mirror: boolean) => {
    g.save();
    if (mirror) {
      g.translate(MAP, 0);
      g.scale(-1, 1);
    }
    g.fillStyle = COBALT;
    g.beginPath();
    g.moveTo(402, 106);
    g.quadraticCurveTo(343, 250, 282, 376);
    g.lineTo(-20, 480);
    g.lineTo(-20, 100);
    g.closePath();
    g.fill();
    g.strokeStyle = "rgba(20,22,27,0.35)";
    g.lineWidth = 3;
    g.setLineDash([9, 7]);
    g.beginPath();
    g.moveTo(410, 112);
    g.quadraticCurveTo(351, 254, 290, 380);
    g.stroke();
    g.setLineDash([]);
    // Cuff: a white band with a thin iridescent line inside it.
    g.strokeStyle = "#f4f5f8";
    g.lineWidth = 16;
    g.beginPath();
    g.moveTo(84, 316);
    g.lineTo(196, 421);
    g.stroke();
    const thread = g.createLinearGradient(80, 300, 200, 430);
    ["#b9c4ff", "#fff1c2", "#ffd3e6", "#c7f0e4"].forEach((col, i) => thread.addColorStop(i / 3, col));
    g.strokeStyle = thread;
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(96, 296);
    g.lineTo(208, 401);
    g.stroke();
    g.restore();
  };
  sleeve(false);
  sleeve(true);

  // Collar rib, then the hem band.
  g.strokeStyle = INK;
  g.lineWidth = 34;
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(402, 110);
  g.bezierCurveTo(430, 205, 594, 205, 622, 110);
  g.stroke();
  g.strokeStyle = "rgba(255,255,255,0.7)";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(410, 134);
  g.bezierCurveTo(436, 222, 588, 222, 614, 134);
  g.stroke();
  g.fillStyle = COBALT;
  g.fillRect(0, 872, MAP, 70);

  // Knitted courses and wales: fine and low contrast so it reads as fabric, not a grid.
  g.fillStyle = "rgba(0,0,0,0.075)";
  for (let y = 0; y < MAP; y += 5) g.fillRect(0, y, MAP, 1);
  g.fillStyle = "rgba(20,22,40,0.05)";
  for (let x = 0; x < MAP; x += 4) g.fillRect(x, 0, 1, MAP);

  // The mark: left chest on the front, high centre on the back.
  g.fillStyle = INK;
  const mark = new Path2D(MARK);
  g.save();
  if (front) {
    g.translate(600, 318);
    g.scale(0.36, 0.36);
  } else {
    g.translate(462, 238);
    g.scale(0.3, 0.3);
  }
  g.fill(mark);
  g.restore();
  return c;
}

/** Tiny chevron stitch pattern, tiled as the bump map. */
function stitchBump(): THREE.CanvasTexture {
  const [c, g] = canvas(48);
  for (let y = 0; y < 48; y++) {
    for (let x = 0; x < 48; x++) {
      const t = y / 12 + Math.abs((x % 12) / 12 - 0.5);
      const v = Math.round(128 + 110 * Math.cos(2 * Math.PI * t));
      g.fillStyle = `rgb(${v},${v},${v})`;
      g.fillRect(x, y, 1, 1);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(34, 34);
  return tex;
}

interface Built {
  group: THREE.Group;
  dispose: () => void;
}

function buildShirt(): Built {
  const field = heightField();
  const alpha = new THREE.CanvasTexture(maskCanvas(MAP));
  const bump = stitchBump();
  const frontMap = new THREE.CanvasTexture(fabricCanvas(true));
  const backMap = new THREE.CanvasTexture(fabricCanvas(false));
  frontMap.colorSpace = THREE.SRGBColorSpace;
  backMap.colorSpace = THREE.SRGBColorSpace;
  for (const t of [frontMap, backMap]) t.anisotropy = 8;

  const material = (map: THREE.Texture) =>
    new THREE.MeshPhysicalMaterial({
      map,
      alphaMap: alpha,
      alphaTest: 0.5,
      alphaToCoverage: true,
      bumpMap: bump,
      bumpScale: 1.4,
      roughness: 0.74,
      metalness: 0,
      sheen: 1,
      sheenRoughness: 0.55,
      sheenColor: new THREE.Color("#c9d2ff"),
    });

  const frontGeo = panelGeometry(field, 1);
  const backGeo = panelGeometry(field, -1);
  const frontMat = material(frontMap);
  const backMat = material(backMap);

  const group = new THREE.Group();
  group.add(new THREE.Mesh(frontGeo, frontMat), new THREE.Mesh(backGeo, backMat));

  return {
    group,
    dispose: () => {
      for (const o of [frontGeo, backGeo, frontMat, backMat, alpha, bump, frontMap, backMap]) o.dispose();
    },
  };
}

function Shirt({ still }: { still: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();
  const built = useMemo(buildShirt, []);
  const scale = Math.min(1.6, viewport.width / 3.2);

  useEffect(() => () => built.dispose(), [built]);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime;
    // Sway through the front, turning far enough to show the sleeve depth and the back panel edge.
    const sway = still ? -0.35 : Math.sin(t * 0.55) * 0.85;
    g.rotation.y += (sway + pointer.x * 0.3 - g.rotation.y) * 0.06;
    g.rotation.x += (-pointer.y * 0.12 + 0.05 - g.rotation.x) * 0.06;
    g.position.y = still ? 0 : Math.sin(t * 0.9) * 0.05;
  });

  return (
    <group ref={ref} scale={scale} position={[0, 0, 0]}>
      <primitive object={built.group} position={[0, -0.2, 0]} />
    </group>
  );
}

export default function ShirtScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : "always"}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#dfe5ff", "#20222c", 0.7]} />
      <directionalLight position={[3, 5, 6]} intensity={2.6} />
      <directionalLight position={[-5, 1, 3]} intensity={0.9} color="#c9d2ff" />
      <directionalLight position={[0, 2, -6]} intensity={1.8} color="#ffe3ef" />
      <Shirt still={still} />
    </Canvas>
  );
}
