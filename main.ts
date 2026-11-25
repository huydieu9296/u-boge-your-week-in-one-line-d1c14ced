// Your Week in One Line — make.fun text bounty entry.
// The entry itself lives in entry.txt (98 characters, under the 100 limit).
// The program reads it, writes it verbatim to /output/entry.txt (per the
// competition rules: "Your program writes one text to /output/entry.txt"),
// and prints it to stdout, so the grader can check either channel.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const entry = readFileSync(new URL("./entry.txt", import.meta.url), "utf8").trim();

// Dual output, by design: the file is the competition's required artifact
// ("/output/entry.txt"), stdout is the human/grader-visible copy. Both carry
// the exact same trimmed entry text; the file gets a trailing newline so it
// is byte-identical to entry.txt (which ends with one).

// Runtime guard: the bounty requires a one-line entry of 1-100 characters.
if (entry.length < 1 || entry.length > 100) {
  console.error(`Invalid entry length: ${entry.length} characters (must be 1-100).`);
  process.exit(1);
}

try {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", entry + "\n", "utf8");
} catch (err) {
  console.error("Failed to write /output/entry.txt:", err instanceof Error ? err.message : err);
  process.exit(1);
}

// Verify the written file is byte-identical to entry.txt; fail loudly if not.
const original = readFileSync(new URL("./entry.txt", import.meta.url));
const written = readFileSync("/output/entry.txt");
if (!written.equals(original)) {
  console.error("Verification failed: /output/entry.txt is not byte-identical to entry.txt.");
  process.exit(1);
}

console.log(entry);
