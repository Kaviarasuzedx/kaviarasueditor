/** Step 7 release gate. Dependency-free static verification; run with Node 20+. */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, relative, join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const read = (path) => readFileSync(join(root, path), "utf8");
const routes = [
  ["", "app"],
  ["work", "app/(marketing)/work"],
  ["about", "app/(marketing)/about"],
  ["services", "app/(marketing)/services"],
  ["contact", "app/(marketing)/contact"],
];
const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
assert(["http:", "https:"].includes(url.protocol), "Invalid site URL protocol");
const assets = [];
for (const [route, directory] of routes) {
  const page = route ? `${directory}/page.tsx` : "app/(marketing)/page.tsx";
  assert(existsSync(join(root, page)), `Missing page: ${page}`);
  assert(read(page).includes("pageMetadata("), `SEO metadata missing from ${page}`);
  for (const file of ["opengraph-image.png", "twitter-image.png"]) {
    const path = join(root, directory, file);
    assert(existsSync(path), `Missing ${directory}/${file}`);
    const data = readFileSync(path);
    assert(data.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex")), `${file} isn't PNG`);
    const width = data.readUInt32BE(16), height = data.readUInt32BE(20);
    assert(width === 1200 && height === 630, `Unexpected image dimensions: ${relative(root, path)} = ${width}x${height}`);
    assert(data.length < 5_000_000, `Share artwork too large: ${path}`);
    assets.push(relative(root, path));
  }
}
for (const file of ["app/sitemap.ts", "app/robots.ts", "app/manifest.ts", "app/icon.svg", "app/apple-icon.png", "app/(marketing)/error.tsx", "app/global-error.tsx", "components/motion/PageTransition.tsx", "components/motion/ScrollProgress.tsx", "components/motion/RouteAnnouncer.tsx"]) {
  assert(existsSync(join(root, file)), `Missing release file: ${file}`);
}
assert(/disallow:\s*"\/"/.test(read("app/robots.ts")), "Missing safe preview robots rule");
assert(/isPublicSiteConfigured/.test(read("app/robots.ts")), "Robots must be domain-aware");
assert(/canonical/.test(read("lib/seo.ts")), "Missing canonical URL metadata");
assert(/metadataBase/.test(read("app/layout.tsx")), "Missing metadataBase");
assert(/prefers-reduced-motion/.test(read("app/globals.css")), "Reduced-motion stylesheet rule missing");
assert(/useReducedMotion/.test(read("components/motion/PageTransition.tsx")), "Page animations must respect reduced motion");
assert(/RouteAnnouncer/.test(read("app/(marketing)/layout.tsx")), "Missing route-accessibility announcement");
assert(/RESEND_API_KEY/.test(read("app/api/contact/route.ts")), "Contact provider configuration missing");
assert(/api\/contact/.test(read("components/contact/ContactForm.tsx")), "Contact form not connected to endpoint");

// Static imports: check project-local aliases and relative references without third-party dependencies.
const sources = [];
function walk(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
    const full = join(folder, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(?:ts|tsx|js|mjs)$/.test(entry.name)) sources.push(full);
  }
}
for (const directory of ["app", "components", "data", "lib"]) walk(join(root, directory));
let importsChecked = 0;
for (const file of sources) {
  const text = readFileSync(file,"utf8");
  for (const match of text.matchAll(/(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g)) {
    const specifier = match[1];
    if (!(specifier.startsWith("@/") || specifier.startsWith("./") || specifier.startsWith("../"))) continue;
    const path = specifier.startsWith("@/") ? join(root, specifier.substring(2)) : resolve(dirname(file), specifier);
    assert([path, path+".ts", path+".tsx", path+".js", path+".mjs", join(path,"index.ts"), join(path,"index.tsx")].some(existsSync), `Broken import ${specifier} in ${relative(root,file)}`);
    importsChecked++;
  }
}
// Every local image ref in source must resolve (Next/Image expects actual files).
let imageRefs = 0;
for (const file of sources) {
  const text = readFileSync(file,"utf8");
  for (const match of text.matchAll(/["'](\/(?:posters|about|services|contact)\/[\w.\-]+\.svg)["']/g)) {
    assert(existsSync(join(root,"public",match[1])), `Missing public image ${match[1]} in ${relative(root,file)}`);
    imageRefs++;
  }
}
console.log(`Step 7 QA passed: 5 routes, ${assets.length} social previews (1200×630), ${importsChecked} local imports, ${imageRefs} image references and release metadata.`);
