import { useCallback, useEffect, useMemo, useState } from "react";
import { userContext } from "./context";
import useChat from "hooks/chat";
import fetch from "config/fetchInstance";
import { socket } from "config/socket";

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const { data: chatData, setData: setChatData } = useChat();

  useEffect(() => {
    socket.connect();

    // 1) Escuta mensagens novas.
    //    Aqui a correção principal é nunca mutar o objeto antigo do estado.
    socket.on("new-message", (response) => {
      setData((oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          chats: oldData.chats.map((chat) => {
            if (String(chat.id) !== String(response.chatId)) return chat;

            const messages = chat.messages ? [...chat.messages] : [];
            messages.push(response.newMessage);

            return {
              ...chat,
              messages,
              unreadMessages: (chat.unreadMessages || 0) + 1,
            };
          }),
        };
      });

      // O Display renderiza a conversa selecionada pelo contexto de chat,
      // então ela também precisa receber a mensagem sem trocar de conversa.
      setChatData((oldChat) => {
        if (
          !oldChat ||
          String(oldChat.id) !== String(response.chatId)
        ) {
          return oldChat;
        }

        return {
          ...oldChat,
          messages: [...(oldChat.messages || []), response.newMessage],
          unreadMessages: 0,
        };
      });
    });

    return () => {
      socket.off("new-message");
      socket.disconnect();
    };
  }, [setChatData]);

  const chatIds = useMemo(
    () => data?.chats?.map((chat) => chat.id),
    [data?.chats],
  );

  useEffect(() => {
    if (chatIds) socket.emit("join-rooms", chatIds);
  }, [chatIds]);

  useEffect(() => {
    const currentChatIndex = data?.chats?.findIndex(
      (chat) => chat.id === chatData?.id,
    );

    if (data?.chats?.[currentChatIndex]?.unreadMessages > 0) {
      setData((oldData) => ({
        ...oldData,
        chats: oldData.chats.map((chat) => {
          if (chat.id === chatData?.id) {
            return { ...chat, unreadMessages: 0 };
          }
          return chat;
        }),
      }));

      fetch.post(`/api/chats/${chatData?.id}/readMessages`, { id: data.id });
    }
  }, [data?.id, data?.chats, chatData?.id]);

  // 2) Atualiza o status online sem mutar o objeto antigo do chat.
  //    O erro anterior era `chat.isLogged = status`, que mutava o estado e
  //    impedia o React de perceber a mudança imediata.
  const changeLoggedStatus = useCallback((id, status) => {
    setData((oldData) => {
      if (!oldData) return null;

      return {
        ...oldData,
        chats: oldData.chats.map((chat) => {
          if (!chat.participants.includes(id)) return chat;

          return {
            ...chat,
            isLogged: status,
          };
        }),
      };
    });
  }, []);

  useEffect(() => {
    if (!data?.id) return;

    // 3) Quando um cliente entra, ele recebe a lista completa de online users.
    socket.on("online-users", (ids) => {
      ids
        .filter((userId) => Number(userId) !== Number(data.id))
        .forEach((userId) => changeLoggedStatus(userId, true));
    });

    // 4) Quando outro usuário entra, atualiza somente esse contato.
    socket.on("user-online", (id) => {
      if (Number(id) !== Number(data.id)) {
        changeLoggedStatus(id, true);
      }
    });

    // 5) Quando outro usuário sai, atualiza status offline.
    socket.on("user-offline", (id) => {
      if (Number(id) !== Number(data.id)) {
        changeLoggedStatus(id, false);
      }
    });

    return () => {
      socket.off("online-users");
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, [data?.id, changeLoggedStatus]);

  return (
    <userContext.Provider value={{ data, setData }}>
      {children}
    </userContext.Provider>
  );
};
