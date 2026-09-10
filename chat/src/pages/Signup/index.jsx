import './styles.scss';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiSignIn } from 'react-icons/pi';
import { faker } from '@faker-js/faker';

import fetch from 'config/fetchInstance';
import Input from 'components/Input';
import Form from 'components/Form';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      imagem: faker.image.avatar(),
      chats: []
    };
    fetch.post('/db/users', data).then(() => navigate('/login'));
  }
  return (
    <Form onSubmit={onSubmit} title='Cadastro' buttonLabel='Cadastrar'>
      <>
        <Input
          label='Nome'
          id='name'
          required
          value={name}
          onChange={setName}
        />
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
          <p>Já tem conta?</p>
          <Link to='/login' className='signup-login-anchor'>
            Faça seu login! <PiSignIn size={20} />
          </Link>
        </div>
      </>
    </Form>
  );
}
