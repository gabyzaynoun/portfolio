#!/usr/bin/env node
/**
 * Normalise all project thumbnails to the same shape:
 * - 1200x630 (Open Graph 1.91:1 aspect ratio) — looks consistent in the cards
 * - JPEG, quality 80, mozjpeg, progressive
 * - Target ~80-150 KB each
 *
 * Reads from public/projects/, writes back in-place as .jpg.
 * Usage: npm run compress-thumbnails
 */
import sharp from "sharp";
import { readdir, rename, unlink, stat } from "node:fs/promises";
import { resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = resolve(__dirname, "../public/projects");

const files = await readdir(dir);
const inputs = files.filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

for (const file of inputs) {
  const src = resolve(dir, file);
  const stem = basename(file, extname(file));
  const tmp = resolve(dir, `__tmp_${stem}.jpg`);
  const out = resolve(dir, `${stem}.jpg`);

  // Skip empty files (failed downloads)
  const { size } = await stat(src);
  if (size === 0) {
    console.warn(`Skipping empty file: ${file}`);
    await unlink(src);
    continue;
  }

  await sharp(src)
    .resize({ width: 1200, height: 630, fit: "cover", position: "top" })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(tmp);

  await unlink(src);
  await rename(tmp, out);

  const { size: newSize } = await stat(out);
  console.log(`${stem}.jpg — ${(newSize / 1024).toFixed(1)}KB`);
}
