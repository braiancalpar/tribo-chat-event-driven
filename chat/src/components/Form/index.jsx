import './styles.scss';
import logo2 from 'assets/logo2.png';

export default function Form({ onSubmit, title, children, buttonLabel }) {
  return (
    <div className='form-container'>
      <div className='form-image'>
        <img src={logo2} alt='logo' />
      </div>
      <h1 className='form-title'>{title}</h1>
      <hr className='form-title-linha' />
      <form onSubmit={onSubmit} className='form-items'>
        {children}
        <input value={buttonLabel} type='submit' className='form-button' />
      </form>
    </div>
  );
}
