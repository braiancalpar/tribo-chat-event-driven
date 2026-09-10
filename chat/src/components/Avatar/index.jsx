import './styles.scss';
import { FaUser } from 'react-icons/fa';

export default function Avatar({ image }) {
  return (
    <div className='avatar-container'>
      {image ? (
        <div className='avatar-image'>
          <img src={image} alt='avatar' />
        </div>
      ) : (
        <FaUser size={20} />
      )}
    </div>
  );
}
