import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Database/db.js';

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('E-mail inválido.');
  }

  if (password.length < 6) {
    return res.status(400).send('A senha deve ter pelo menos 6 caracteres.');
  }

  try {
    const existingUser = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).send('E-mail ou usuário já existe.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO usuarios (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, username, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro ao registrar usuário');
  }
};

export const login = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  try {
    const user = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 OR username = $2',
      [login, login]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Login inválido.' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Login realizado com sucesso!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro ao efetuar login');
  }
};

export const getData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dados');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro ao buscar dados');
  }
};
