import './index.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Layout from 'components/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' Component={Signup} />
        <Route path='/login' Component={Login} />
        <Route path='/' element={<Layout />}>
          <Route index Component={Home} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;