import { useContext, useEffect } from 'react';
import { conversaContext } from './context';
import { isEsc } from 'utils/checkKeys';

const useChat = () => {
  const { data, setData } = useContext(conversaContext);

  useEffect(() => {
    document.addEventListener("keydown", isEsc(setData), false);
    return () =>  document.removeEventListener("keydown", isEsc(setData), false);
  }, [setData])

  function selectChat(novaConversa) {
    setData(novaConversa);
  }

  return { data, setData, selectChat }
}

export default useChat;