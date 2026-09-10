import './styles.scss';

import { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';

import displayEmpty from 'assets/display-empty.png';
import useConversa from 'hooks/chat';
import useUser from 'hooks/user';
import Avatar from 'components/Avatar';
import fetch from 'config/fetchInstance';
import { isEnter } from 'utils/checkKeys';

export default function Display() {
  const [newMessageText, setNewMessageText] = useState('');
  const { data } = useConversa();
  const [messages, setMessages] = useState(data?.messages);
  const { id, name } = useUser();

  useEffect(() => setMessages(data?.messages), [data?.messages]);

  function verDetalhes() {
    alert('Esta função ainda não existe, sinta-se à vontade para criar!');
  }

  function sendMessage() {
    const newMessage = {
      userId: id,
      text: newMessageText,
      name,
      date: new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date()),
      id: data.id,
    };
    newMessage.otherUserId = data.participants.find(
      (participantId) => id !== participantId,
    );
    setMessages((oldMessages = []) => [...oldMessages, newMessage]);
    fetch.post(`/api/chats/${data.id}/messages`, newMessage);
    setNewMessageText('');
  }

  if (!data) {
    return (
      <div className='display'>
        <div className='display-empty'>
          <p>
            Você ainda não selecionou uma conversa! <br /> Selecione uma
            conversa para começar!
          </p>
          <img src={displayEmpty} alt='bate-papo' />
        </div>
      </div>
    );
  }

  return (
    <div className='display'>
      <div className='display-header'>
        <div className='display-header-content'>
          <Avatar imagem={data.imagem} />
          <div className='display-header-content-nome'>
            <h2>{data.name}</h2>
            <span onClick={verDetalhes}>
              Clique para ver detalhes do contato
            </span>
          </div>
        </div>
      </div>
      <div className='display-messages'>
        {messages?.map((message, index) => {
          const actualMessageOwner =
            message.userId === id ? 'owner' : 'foreign';

          return (
            <div
              key={index}
              className={`display-messages-item display-messages-item--${actualMessageOwner}`}
            >
              <span className='display-messages-item-name'>{message.name}</span>
              <span>{message.text}</span>
              <span className='display-messages-item-date'>{message.date}</span>
            </div>
          );
        })}
      </div>
      <div className='display-input'>
        <input
          className='display-input-element'
          placeholder='Digite sua mensagem'
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          onKeyDown={isEnter(sendMessage)}
        />
        <button className='display-input-button' onClick={sendMessage}>
          <IoSend size={16} />
        </button>
      </div>
    </div>
  );
}
