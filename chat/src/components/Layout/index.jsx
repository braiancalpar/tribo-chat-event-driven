import { Outlet, useNavigate } from 'react-router-dom';
import './styles.scss';
import logo from 'assets/logo.png';
import { MdOutlineChat } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import useUser from 'hooks/user';
import { useEffect } from 'react';

export default function Layout() {
  const { logout, checkLogin } = useUser();
  const navigate = useNavigate();

  function redirectHome() {
    navigate('/');
  }

  useEffect(() => {
    checkLogin((isLogged) => !isLogged && navigate('/login'));
  }, [checkLogin, navigate]);

  return (
    <main className='container'>
      <nav className='navbar'>
        <div className='navbar-list'>
          <div className='navbar-logo' onClick={redirectHome}>
            <img src={logo} alt='logo' />
          </div>
          <button className='navbar-list-item'>
            <MdOutlineChat size={22} />
            <span>Chat</span>
          </button>
        </div>
        <div className='navbar-list-item' onClick={logout}>
          <FiLogOut size={20} />
          Logout
        </div>
      </nav>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  );
}
