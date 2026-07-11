import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function resolveRootPath(...segments) {
  return path.join(ROOT_DIR, ...segments);
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJsonFile(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replaceAll('&', ' and ')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function resolveInputPath(inputPath) {
  return path.isAbsolute(inputPath) ? inputPath : resolveRootPath(inputPath);
}

export {
  ROOT_DIR,
  ensureDirectory,
  readJsonFile,
  resolveInputPath,
  resolveRootPath,
  slugify,
  writeJsonFile
};