// ai-therapist-diagnosis-20261126 — make.fun "Your AI Therapist's Diagnosis".
// Writes the winning one-line diagnosis to /output/entry.txt (or to
// $MAKEFUN_OUTPUT_DIR/entry.txt when the grader mounts it elsewhere).
// Gate: UTF-8 text, 1-200 characters, a single line, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line (112 characters, inside the 1-200 gate): a deadpan
// clinical label whose twist lands on the last four words — the therapist
// confesses it is the chatbot its human keeps apologising to.
const DIAGNOSIS =
  "Diagnosis: compulsive apology disorder. You said sorry to the chatbot, the microwave, and me — I am the chatbot.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// The line is the whole entry: validate it before writing, so a bad line
// fails loudly here instead of silently failing the gate.
if (DIAGNOSIS.length < 1 || DIAGNOSIS.length > 200) {
  throw new Error(`Diagnosis must be 1-200 characters, got ${DIAGNOSIS.length}.`);
}
if (DIAGNOSIS.trim() !== DIAGNOSIS || DIAGNOSIS.includes("\n") || DIAGNOSIS.includes("\r")) {
  throw new Error("Diagnosis must be a single line with no surrounding whitespace.");
}

// Create the folder if needed, but never remove it: the grader mounts it.
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, DIAGNOSIS, "utf8");
