import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

export const app = express();

app.use(cors());
app.use(express.json());

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174']
  }
});