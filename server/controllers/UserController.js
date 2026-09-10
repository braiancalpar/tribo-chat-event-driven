import { writeFile } from '../utils/file.js';
import db from '../db.json' with { type: 'json' };

export default function UserController() {
  function logonUser(id, socket, callback) {
    if (!id) return;
    const newDb = { ...db };
    const userIndex = newDb.users.findIndex(userDb => userDb.id === Number(id));
    newDb.users[userIndex].isLogged = true;
    newDb.users[userIndex].chats.map(chat => {
      socket.join(`chat${chat.id}`);
    })

    writeFile(newDb, callback);
  }

  function logoffUser(id, callback) {
    if (!id) return;
    const newDb = { ...db };
    const userIndex = newDb.users.findIndex(userDb => userDb.id === Number(id));
    newDb.users[userIndex].isLogged = false;

    writeFile(newDb, callback);
  }

  return { logonUser, logoffUser };
} 