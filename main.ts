// Spotlight @crisxai5 — make.fun entrypoint (Node 22, standard library only).
//
// The entry is the X post itself, not this program. POST.json at the
// repository root holds the post's address; all this program does is hand
// that file to the grader by copying it into the output directory, where the
// house reads it and then reads the post's public counts through FxTwitter.
// The score comes from the post (likes + reposts + quotes), never from
// anything written here.
//
// When run outside the grader's container, the two directories it expects
// (/bot and /output) are faked with environment variables:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import fs from 'node:fs';

const postName = 'POST.json';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function die(reason: string): never {
  console.error(`spotlight-crisxai5 entry: ${reason}`);
  process.exit(1);
}

const from = `${botDir}/${postName}`;
const to = `${outputDir}/${postName}`;

try {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.copyFileSync(from, to);
} catch (caught) {
  die(`cannot hand ${postName} to the grader (${from} -> ${to}): ${(caught as Error).message}`);
}
