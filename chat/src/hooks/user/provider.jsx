import { useEffect, useState } from 'react';
import { userContext } from './context';
import useChat from 'hooks/chat';
import fetch from 'config/fetchInstance';

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const { data: chatData } = useChat();

  useEffect(() => {
    const currentChatIndex = data?.chats.findIndex(chat => chat.id === chatData?.id);
    if (data?.chats[currentChatIndex]?.unreadMessages > 0) {
      setData(oldData => ({
        ...oldData,
        chats: oldData.chats.map(chat => {
          if (chat.id === chatData?.id) {
            return { ...chat, unreadMessages: 0 }
          }
          return chat;
        })
      }))
      fetch.post(`/api/chats/${chatData?.id}/readMessages`, { id: data.id });
    }
  }, [data?.id, data?.chats, chatData?.id])

  return (
    <userContext.Provider value={{ data, setData }}>
      {children}
    </userContext.Provider>
  );
};
