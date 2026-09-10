import jsonServer from 'json-server';
import usersRouter from './routes/users.js';
import chatsRouter from './routes/chats.js';
import { server, app } from './config/instances.js';
import './socket/index.js';

const port = 8080;

app.use('/db', jsonServer.router('db.json'));

app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);

server.listen(port, () => {
  console.log(`server listening to port ${port}`);
})