/**
 * Verify Step 5 copy and local visual assets without spinning up a browser.
 * Uses TypeScript's transpiler because the source is intentionally typed TS.
 */
import ts from "typescript";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assert = (truthy, message) => { if (!truthy) throw new Error(message); };
const loadData = (filename) => {
  const input = readFileSync(join(root, "data", filename), "utf8");
  const { outputText, diagnostics } = ts.transpileModule(input, {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    reportDiagnostics: true,
  });
  assert(!diagnostics?.length, `Syntax errors in ${filename}`);
  const module = { exports: {} };
  runInNewContext(outputText, { exports: module.exports, module });
  return module.exports;
};

const { creativeSkills, editorialJourney, valueProps, behindTheScenes } = loadData("about.ts");
const { services, editingProcess, serviceFaqs, homeServices } = loadData("services.ts");
assert(creativeSkills.length === 5, "About needs five creative skills");
assert(editorialJourney.length === 5, "About journey needs five editorial chapters");
assert(valueProps.length === 3, "About value props should be three items");
assert(behindTheScenes.length === 3, "About needs three BTS illustrations");
assert(services.length === 6, "Services page needs six detailed service blocks");
assert(homeServices.length === 4, "Homepage service previews must remain intact");
assert(editingProcess.map(({ title }) => title).join(" > ") === "Brief > Edit > Review > Deliver", "Process stages must be Brief / Edit / Review / Deliver");
assert(serviceFaqs.length >= 6, "Expected detailed services FAQs");
const ids = new Set();
for (const service of services) {
  assert(service.id && !ids.has(service.id), `Duplicate or invalid service id: ${service.id}`);
  ids.add(service.id);
  for (const key of ["title", "description", "formats", "turnaround", "artworkAlt"]) {
    assert(typeof service[key] === "string" && service[key].length >= (key === "title" ? 5 : 14), `${service.id}: missing ${key}`);
  }
  assert(service.deliverables.length >= 3, `${service.id}: add at least three deliverables`);
  assert(service.turnaround.startsWith("Indicative:"), `${service.id}: turnaround must be clearly nonbinding`);
  assert(service.artwork.startsWith("/services/"), `${service.id}: artwork outside /services/`);
  assert(existsSync(join(root, "public", service.artwork)), `${service.id}: missing illustration`);
}
for (const scene of behindTheScenes) {
  assert(scene.src.startsWith("/about/") && existsSync(join(root, "public", scene.src)), `Missing BTS image ${scene.src}`);
  assert(scene.alt && scene.label, `Missing accessible descriptive text for ${scene.src}`);
}
for (const milestone of editorialJourney) {
  assert(milestone.year && milestone.title && milestone.description, "Incomplete journey chapter");
}
console.log(`Step 5 content valid: ${creativeSkills.length} skills, ${services.length} services, ${editingProcess.length} process stages, ${serviceFaqs.length} FAQs and all SVG assets.`);
