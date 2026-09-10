import './config/_variables.scss';
import 'normalize.css';
import { createRoot } from 'react-dom/client';
import Router from './router';
import { UserProvider } from 'hooks/user/provider';
import { ConversaProvider } from 'hooks/chat/provider';

createRoot(document.getElementById('root')).render(
  <ConversaProvider>
    <UserProvider>
      <Router />
    </UserProvider>
  </ConversaProvider>,
);
