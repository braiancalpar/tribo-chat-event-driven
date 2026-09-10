import { useCallback, useContext } from "react";
import { userContext } from "./context";

const useUser = () => {
  const { data, setData } = useContext(userContext);

  function login(user) {
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
    setData(null);
  }

  return { checkLogin, ...data, login, logout, setData };
};

export default useUser;
