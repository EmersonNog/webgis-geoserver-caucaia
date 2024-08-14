import express from 'express';
import { register, login, getData } from '../Controllers/authController.js';
import verifyToken from '../Middleware/verifyToken.js';

const routes = express.Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/map', verifyToken, (req, res) => {
  res.send('Middleware.');
});
routes.get('/dados', getData);

export default routes;
