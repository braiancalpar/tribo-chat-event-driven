import { useCallback, useContext } from "react";
import { userContext } from "./context";
import { socket } from "config/socket";

const useUser = () => {
  const { data, setData } = useContext(userContext);

  function login(user) {
    socket.emit("save-id", user.id);
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
    socket.emit("logoff", data.id);
    setData(null);
  }

  return { checkLogin, ...data, login, logout, setData };
};

export default useUser;
