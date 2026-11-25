/**
 * Zero-browser content validation for Step 4.
 * Run after npm install: npm run validate:content
 * Parses the project's editable TypeScript data file and checks poster references.
 */
import ts from "typescript";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = readFileSync(join(root, "data/projects.ts"), "utf8");
const compiled = ts.transpileModule(input, {
  fileName: "projects.ts",
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true,
});
if (compiled.diagnostics?.length) {
  throw new Error("TypeScript syntax errors in data/projects.ts");
}
const module = { exports: {} };
runInNewContext(compiled.outputText, { exports: module.exports, module });
const { portfolioProjects, featuredProjects, workFilters } = module.exports;
const invariant = (condition, message) => {
  if (!condition) throw new Error(message);
};
invariant(Array.isArray(portfolioProjects) && portfolioProjects.length >= 8, "Expected eight or more portfolio concepts");
invariant(Array.isArray(featuredProjects) && featuredProjects.length === 4, "Expected four homepage featured concepts");
const names = new Set();
for (const project of portfolioProjects) {
  invariant(typeof project.slug === "string" && /^[a-z0-9-]+$/.test(project.slug), `Invalid slug: ${project.slug}`);
  invariant(!names.has(project.slug), `Duplicate slug: ${project.slug}`);
  names.add(project.slug);
  invariant(project.title && project.description && project.brief && project.approach, `${project.slug} is missing descriptive copy`);
  invariant(project.videoSrc.startsWith("https://"), `${project.slug} video needs HTTPS`);
  invariant(project.sourcePage.startsWith("https://"), `${project.slug} source page needs HTTPS`);
  invariant(["16:9", "9:16"].includes(project.format), `${project.slug} has invalid format`);
  invariant(["1080p", "4K"].includes(project.resolution), `${project.slug} has invalid resolution`);
  invariant(Array.isArray(project.filters) && project.filters.length, `${project.slug} has no categories`);
  invariant(Array.isArray(project.tools) && project.tools.length, `${project.slug} has no tools`);
  invariant(Array.isArray(project.credits) && project.credits.length, `${project.slug} has no credits`);
  invariant(Array.isArray(project.deliverables) && project.deliverables.length, `${project.slug} has no deliverables`);
  invariant(project.poster.startsWith("/posters/") && existsSync(join(root, "public", project.poster)), `${project.slug} poster is missing`);
  for (const filter of project.filters) {
    invariant(workFilters.includes(filter) && filter !== "All", `${project.slug} has unknown filter ${filter}`);
  }
}
for (const filter of workFilters) {
  if (filter === "All") continue;
  invariant(portfolioProjects.some((item) => item.filters.includes(filter)), `Filter ${filter} has no projects`);
}
console.log(`Validated ${portfolioProjects.length} concept projects, ${workFilters.length} filters and all local poster assets.`);
