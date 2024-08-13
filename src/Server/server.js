import express from 'express';
import routes from './routes/authRoutes.js';
import cors from 'cors';
import './Config/dotenv.js';

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
