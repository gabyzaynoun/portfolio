#!/usr/bin/env node
/**
 * Compress the portrait image to a web-friendly size.
 * Source:  _legacy/assets/gaby-zaynoun.jpg  (~12.7MB)
 * Output:  public/gaby-zaynoun.jpg          (target <300KB)
 *
 * Usage:   npm run compress-portrait
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Source: prefer the user-provided headshot in OneDrive; fall back to legacy.
const ONEDRIVE_SRC = "C:/Users/gabyz/OneDrive/Pictures/Gabysphoto.jpg";
const LEGACY_SRC = resolve(root, "_legacy/assets/gaby-zaynoun.jpg");
const SRC = existsSync(ONEDRIVE_SRC) ? ONEDRIVE_SRC : LEGACY_SRC;
const OUT_DIR = resolve(root, "public");
const OUT = resolve(OUT_DIR, "gaby-zaynoun.jpg");

if (!existsSync(SRC)) {
  console.error(`Source image not found: ${SRC}`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const img = sharp(SRC).rotate(); // auto-orient by EXIF

const meta = await img.metadata();
console.log(`Source: ${meta.width}x${meta.height}, format=${meta.format}`);

await img
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toFile(OUT);

const { size } = await import("node:fs").then((m) => m.promises.stat(OUT));
console.log(`Wrote ${OUT} — ${(size / 1024).toFixed(1)}KB`);
