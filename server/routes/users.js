import express from "express";

function getUsuarioById(id, cb) {
  import("../db.json", { with: { type: "json" } }).then((module) => {
    const dbFromImport = module.default;
    const newDb = { ...dbFromImport };
    const { users, chats } = newDb;
    const userIndex = users.findIndex((userDb) => userDb.id === Number(id));
    const user = { ...users[userIndex] };

    if (user) {
      const otherUsers = [...users.filter((userDb) => userDb.id !== user.id)];

      otherUsers?.map((userDb) => {
        const userChatIndex = user.chats?.findIndex((chatDb) =>
          chatDb.participants?.includes(userDb.id),
        );
        const userChat = user.chats?.[userChatIndex];
        const completeChat = {
          ...chats.find((chatDb) => {
            return (
              chatDb.participants.includes(user.id) &&
              chatDb.participants.includes(userDb.id)
            );
          }),
        };

        const newChat = {
          name: userDb.name,
          image: userDb.image,
          participants: [user.id, userDb.id],
          type: "chat",
          unreadMessages: 0,
          ...userChat,
          ...completeChat,
        };

        if ((!userChatIndex && userChatIndex !== 0) || userChatIndex !== -1) {
          user.chats[userChatIndex] = newChat;
        } else {
          user.chats.push(newChat);
        }
      });

      cb(user);
    } else cb(null);
  });
}

const usersRouter = express.Router();

usersRouter.get("/:id", (req, res) => {
  getUsuarioById(req.params.id, (user) => {
    if (user) res.status(200).json(user);
    else res.status(404).json();
  });
});

usersRouter.post("/login", (req, res) => {
  import("../db.json", { with: { type: "json" } }).then((module) => {
    const dbFromImport = module.default;
    const newDb = { ...dbFromImport };
    const { users } = newDb;
    const user = users.find(
      (userDb) =>
        userDb.email === req.body.email &&
        String(userDb.password) === String(req.body.password),
    );
    if (user) {
      getUsuarioById(user.id, (loggedUser) => {
        res.status(200).json({ ...user, ...loggedUser });
      });
    } else {
      res.status(401).json();
    }
  });
});

export default usersRouter;
