import { useCallback, useContext } from 'react';
import { userContext } from './context';
import fetch from 'config/fetchInstance';

const useUser = () => {
  const { data, setData } = useContext(userContext);

  function login(user) {
    const newUser = { ...user, isLogged: true };
    localStorage.setItem('user', JSON.stringify(newUser));
    setData({ ...user, isLogged: true });
  }

  const checkLogin = useCallback((callback) => {
    const userStorage = localStorage.getItem('user');
    const user = userStorage
      ? { ...JSON.parse(userStorage), fromStorage: true }
      : null;

    if (data?.id) return callback?.(true);

    if (!data?.id && user) {
      return fetch.get(`/api/users/${user.id}`).then((response) => {
        const newUser = { ...response.data, isLogged: true };
        localStorage.setItem('user', JSON.stringify(newUser));
        setData(newUser);
        callback?.(true);
      });
    }
    callback?.(false);
  }, [data?.id, setData])

  function logout() {
    localStorage.removeItem('user');
    setData(null);
  }

  return { checkLogin, ...data, login, logout, setData };
};

export default useUser;
