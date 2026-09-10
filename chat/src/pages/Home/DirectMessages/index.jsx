import { useEffect, useState } from 'react';

import CardChat from 'components/CardChat';
import useChat from 'hooks/chat';
import useUser from 'hooks/user';
import matchFilter from 'utils/matchFilter';

export default function DirectMessages({ filter }) {
  const { chats } = useUser();
  const { selectChat } = useChat();
  const [messagesWithFilter, setMessagesWithFilter] = useState(chats);

  useEffect(
    () => matchFilter({ filter, list: chats }, setMessagesWithFilter),
    [filter, chats],
  );

  return (
    <div className='home-chat-mensagens-container'>
      <h3 className='home-chat-mensagens-title'>Mensagens Diretas</h3>
      <div className='home-chat-mensagens-list'>
        {messagesWithFilter?.map((message, index) => (
          <CardChat onClick={selectChat} key={index} {...message} />
        ))}
      </div>
    </div>
  );
}
