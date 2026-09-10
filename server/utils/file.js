import fs from 'node:fs';

export function writeFile(newDb, callback) {
  fs.writeFile(
    '../db.json',
    JSON.stringify(newDb, null, 2),
    () => callback?.(),
  );
}
