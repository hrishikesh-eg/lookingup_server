import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const src = join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const destDir = join(root, "public");
const dest = join(destDir, "pdf.worker.min.mjs");

if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log("[postinstall] Copied pdf.js worker to public/pdf.worker.min.mjs");
} else {
  console.warn("[postinstall] pdf.js worker not found — skipping copy.");
}
