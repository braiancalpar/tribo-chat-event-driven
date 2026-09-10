import './styles.scss';
import Avatar from 'components/Avatar';

export default function CardChat({
  name,
  date,
  unreadMessages,
  messages = [],
  image,
  onClick,
  ...props
}) {
  const text = messages[messages.length - 1]?.text;

  function selecionar() {
    onClick?.({
      name,
      date,
      unreadMessages,
      messages,
      image,
      ...props,
    });
  }

  return (
    <div className='cardChat-container' onClick={selecionar}>
      <div className='cardChat-container-image'>
        <Avatar image={image} />
      </div>
      <div className='cardChat-container-list'>
        <div className='cardChat-content'>
          <h4 className='cardChat-content-nome'>{name}</h4>
          <div className='cardChat-content-mensagem'>{text}</div>
        </div>
        <div className='cardChat-metadata'>
          <span className='cardChat-metadata-data'>{date}</span>
          {!!unreadMessages && (
            <div className='cardChat-metadata-mensagens-nao-lidas'>
              {unreadMessages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
