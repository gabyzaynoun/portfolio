#!/usr/bin/env node
/**
 * Renders public/Gaby-Zaynoun-Resume.docx to public/Gaby-Zaynoun-Resume.pdf.
 *
 * Why convert rather than lay the PDF out separately: the DOCX is the single
 * source of truth. Rendering it means the two files cannot drift — there is no
 * second layout codepath to keep in sync. Both artefacts are committed to
 * public/, so this only ever runs locally; Vercel builds never invoke it.
 *
 * Uses whatever renderer the machine has: LibreOffice (any platform) first,
 * then Word via COM (Windows). If neither is present it exits non-zero with
 * instructions rather than silently leaving a stale PDF in place.
 *
 * Run: npm run generate-resume   (runs the DOCX build, then this)
 */
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "../public");
const DOCX = resolve(PUBLIC, "Gaby-Zaynoun-Resume.docx");
const PDF = resolve(PUBLIC, "Gaby-Zaynoun-Resume.pdf");

if (!existsSync(DOCX)) {
  console.error(`Missing ${DOCX} — run \`npm run generate-resume\` first.`);
  process.exit(1);
}

const LIBREOFFICE_CANDIDATES = [
  "soffice",
  "libreoffice",
  "C:\Program Files\LibreOffice\program\soffice.exe",
  "C:\Program Files (x86)\LibreOffice\program\soffice.exe",
  "/Applications/LibreOffice.app/Contents/MacOS/soffice",
];

function tryLibreOffice() {
  for (const bin of LIBREOFFICE_CANDIDATES) {
    try {
      execFileSync(bin, ["--headless", "--convert-to", "pdf", "--outdir", PUBLIC, DOCX], {
        stdio: "ignore",
        timeout: 120_000,
      });
      if (existsSync(PDF)) return `LibreOffice (${bin})`;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

function tryWord() {
  if (process.platform !== "win32") return null;
  // wdFormatPDF = 17
  const ps = `
$ErrorActionPreference = 'Stop'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  $doc = $word.Documents.Open('${DOCX}', $false, $true)
  $doc.SaveAs([ref]'${PDF}', [ref]17)
  $doc.Close($false)
} finally {
  $word.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}`.trim();
  try {
    execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", ps], {
      stdio: "ignore",
      timeout: 120_000,
    });
    return existsSync(PDF) ? "Microsoft Word (COM)" : null;
  } catch {
    return null;
  }
}

const via = tryLibreOffice() ?? tryWord();

if (!via) {
  console.error(
    "Could not render the PDF — no converter found.\n" +
      "Install LibreOffice (https://www.libreoffice.org/download/) or run this on a\n" +
      "machine with Microsoft Word. The DOCX was still written successfully.",
  );
  process.exit(1);
}

const kb = (statSync(PDF).size / 1024).toFixed(1);
console.log(`Wrote ${PDF} — ${kb}KB (via ${via})`);
