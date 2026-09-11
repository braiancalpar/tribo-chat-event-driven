import { io } from "../config/instances.js";
import UserController from "../controllers/userController.js";

// 1) Guarda o estado global de usuários online no servidor.
//    Isso foi o passo principal para resolver o problema de:
//    - quando quem já estava online não aparecia para o usuário novo
//    - e também para manter a lógica de disconnect abrupto funcionando.
const sockets = {};
const onlineUsers = new Set();

io.on("connection", (socket) => {
  const userController = UserController();

  // 2) Quando o cliente faz login, registramos o socket -> userId
  //    e também colocamos esse usuário no conjunto de onlineUsers.
  //    Isso preserva a funcionalidade de "save-id" para fechar a aba sem avisar,
  //    mas agora sem quebrar a sincronização de online.
  socket.on("save-id", (id) => {
    if (!id) return;

    const userId = Number(id);

    sockets[socket.id] = userId;
    onlineUsers.add(userId);

    // 3) Envia a lista completa de todos os usuários online para o cliente novo.
    //    Esse snapshot resolve o caso em que Luiz loga antes da Marcia:
    //    quando a Marcia entra, ela recebe que o Luiz já estava online.
    socket.emit("online-users", [...onlineUsers]);

    // 4) Avisa qualquer outro cliente que esse usuário acabou de entrar.
    socket.broadcast.emit("user-online", userId);

    // 5) Atualiza o banco também, mantendo consistência com o arquivo JSON.
    userController.logonUser(userId);
  });

  // 6) Disconnect abrupto: quando a aba fecha sem logoff explícito,
  //    pegamos o userId do socket e removemos da lista global.
  socket.on("disconnect", () => {
    const id = sockets[socket.id];

    if (!id) return;

    delete sockets[socket.id];
    onlineUsers.delete(Number(id));

    io.emit("user-offline", Number(id));

    // 7) Persiste a mudança no JSON do servidor.
    userController.logoffUser(id);
  });

  // 8) Logoff manual: mantém a mesma lógica, sem depender de disconnect.
  socket.on("logoff", (id) => {
    if (!id) return;

    const userId = Number(id);

    delete sockets[socket.id];
    onlineUsers.delete(userId);

    io.emit("user-offline", userId);
    userController.logoffUser(userId);
  });

  // 9) Mantém o join-rooms para entrar nos chats.
  socket.on("join-rooms", (chatIds) => {
    chatIds.forEach((chatId) => socket.join(`chat${chatId}`));
  });

  // 10) Mantém o add-user-id por compatibilidade, mas ele não é o ponto principal
  //     do status online. O principal passa a ser save-id + onlineUsers.
  socket.on("add-user-id", (id) => {
    userController.logonUser(id, socket, () => {
      io.emit("user-logged", id);
    });
  });
});
