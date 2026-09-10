import { writeFile } from "../utils/file.js";

export default function UserController() {
  function logonUser(id, socket, callback) {
    if (!id) return;

    import("../db.json", { with: { type: "json" } }).then((module) => {
      const dbFromImport = module.default;
      const newDb = { ...dbFromImport };
      const userIndex = newDb.users.findIndex(
        (userDb) => userDb.id === Number(id),
      );
      newDb.users[userIndex].isLogged = true;
      writeFile(newDb, callback);
    });
  }

  function logoffUser(id, callback) {
    if (!id) return;

    import("../db.json", { with: { type: "json" } }).then((module) => {
      const dbFromImport = module.default;
      const newDb = { ...dbFromImport };
      const userIndex = newDb.users.findIndex(
        (userDb) => userDb.id === Number(id),
      );
      newDb.users[userIndex].isLogged = false;

      writeFile(newDb, callback);
    });
  }

  return { logonUser, logoffUser };
}
