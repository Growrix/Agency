import path from 'node:path';

import QRCode from 'qrcode';

import { ensureDirectory, resolveInputPath } from '../lib/paths.js';

const url = process.argv[2];
const outputPath = resolveInputPath(process.argv[3] || path.join('outputs', 'qr-code.png'));

if (!url) {
  console.error('Usage: node scripts/qr-generate.js <url> [output-path]');
  process.exit(1);
}

try {
  ensureDirectory(path.dirname(outputPath));
  await QRCode.toFile(outputPath, url, {
    width: 400,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  console.log(`QR code written to ${outputPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}