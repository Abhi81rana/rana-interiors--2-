// Tiny JSON-file database: no native modules, fine for a small business site.
// Data lives in server/data/db.json. Back this file (and server/uploads) up regularly.
// If you outgrow it, swap this module for SQLite/PostgreSQL/MongoDB.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = path.join(__dirname, 'data');
export const UPLOADS_DIR = path.join(__dirname, 'uploads');
const FILE = path.join(DATA_DIR, 'db.json');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

let cache = null;
let chain = Promise.resolve();

export function getDb() {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    cache = {};
  }
  cache.enquiries ||= [];
  cache.projects ||= [];
  return cache;
}

/** Call after mutating the object returned by getDb(). Writes are queued and atomic. */
export function save() {
  const snapshot = JSON.stringify(getDb(), null, 2);
  chain = chain
    .then(async () => {
      const tmp = `${FILE}.tmp`;
      await fs.promises.writeFile(tmp, snapshot);
      await fs.promises.rename(tmp, FILE);
    })
    .catch((err) => console.error('Failed to save database:', err));
  return chain;
}
