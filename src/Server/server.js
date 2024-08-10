import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3000, () => {
  console.log('Iniciado');
});
