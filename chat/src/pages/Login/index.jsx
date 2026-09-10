import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiSignOut } from 'react-icons/pi';

import fetch from 'config/fetchInstance';
import Form from 'components/Form';
import Input from 'components/Input';
import useUser from 'hooks/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const data = { email, password };
    return fetch
      .post('/api/users/login', data)
      .then((response) => {
        login(response.data);
        return navigate('/');
      })
      .catch(() => alert('email ou senha incorretos!'));
  }

  return (
    <Form onSubmit={onSubmit} title='Login' buttonLabel='Entrar'>
      <Input
        label='Email'
        type='email'
        id='email'
        required
        value={email}
        onChange={setEmail}
      />
      <Input
        label='Senha'
        type='password'
        id='password'
        required
        value={password}
        onChange={setPassword}
      />
      <div className='signup-login'>
        <p>Não tem uma conta?</p>
        <Link to='/signup' className='signup-login-anchor'>
          Cadastre-se! <PiSignOut size={20} />
        </Link>
      </div>
    </Form>
  );
}
