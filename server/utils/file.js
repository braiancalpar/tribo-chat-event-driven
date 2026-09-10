import fs from "node:fs";
import path from "node:path";

export function writeFile(newDb, callback) {
  fs.writeFile(path.resolve("db.json"), JSON.stringify(newDb, null, 2), () =>
    callback?.(),
  );
}
