import express from 'express';

const routes = express.Router();

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

export default routes;
