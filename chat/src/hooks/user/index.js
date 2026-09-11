import { useCallback, useContext } from "react";
import { userContext } from "./context";
import { socket } from "config/socket";

const useUser = () => {
  const { data, setData } = useContext(userContext);

  function login(user) {
    // 1) continua emitindo save-id porque ele serve para mapear socket -> userId
    //    e resolver o caso de disconnect brusco.
    socket.emit("save-id", user.id);

    // 2) Atualiza o estado do usuário no cliente para o arranque da sessão.
    setData({ ...user, isLogged: true });
  }

  const checkLogin = useCallback(
    (callback) => {
      if (data?.id) {
        return callback?.(true);
      }

      if (!data?.id) {
        return callback?.(false);
      }
    },
    [data?.id],
  );

  function logout() {
    // 3) Emite logoff no servidor para manter a sincronização dos demais clientes.
    socket.emit("logoff", data.id);
    setData(null);
  }

  return { checkLogin, ...data, login, logout, setData };
};

export default useUser;
