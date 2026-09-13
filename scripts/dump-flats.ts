import { writeFileSync } from "node:fs";
import { DEFAULT_SPEC, deriveGeometry, layoutAnnotations, type GarmentSpec } from "@/lib/garment";
import { gradeMeasurements } from "@/lib/garment/measure";
import {
  collarPath,
  constructionPaths,
  placketPath,
  polylinePath,
  silhouettePath,
  styleSeamPaths,
} from "@/components/flat/paths";

const variants: Record<string, Partial<GarmentSpec>> = {
  crew: {},
  raglan: { style: "raglan", sleeve: "long" },
  polo: { style: "polo" },
};

const out: Record<string, unknown> = {};
for (const [name, patch] of Object.entries(variants)) {
  const spec = { ...DEFAULT_SPEC, ...patch } as GarmentSpec;
  const geo = deriveGeometry(spec, "front");
  const ann = layoutAnnotations(spec, { view: "front" });
  out[name] = {
    viewBox: ann.viewBox,
    silhouette: silhouettePath(geo),
    collar: collarPath(geo),
    placket: placketPath(geo),
    measures: gradeMeasurements(spec),
    seams: styleSeamPaths(geo).map((s) => s.d),
    construction: constructionPaths(geo).map((c) => c.d),
    callouts: ann.callouts.map((c) => ({
      marker: c.marker,
      label: c.label,
      rule: polylinePath(c.rule),
      ticks: c.ticks.map((t) => polylinePath(t)),
      leader: polylinePath(c.leader),
      dot: c.dot,
      chip: c.chip,
    })),
  };
}
writeFileSync(process.argv[2], JSON.stringify(out, null, 2));
console.log("ok", Object.keys(out));
