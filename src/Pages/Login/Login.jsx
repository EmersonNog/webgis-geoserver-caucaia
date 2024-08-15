import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/logo.png';
import './Login.css';
import api from '../../Config/Api';

const Login = () => {
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.login || !loginData.password) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/login', loginData); // Use a instância do Axios

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/map');
      } else {
        const errorData = response.data;
        toast.error(`${errorData.error || 'Credenciais inválidas'}`);
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={logo} alt="Login Illustration" />
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login">E-mail ou Usuário</label>
            <input
              type="text"
              id="login"
              placeholder="E-mail/Usuário"
              value={loginData.login}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="login-options">
            <button type="submit">LOGIN</button>
          </div>
        </form>
        <p>
          Ainda não tem uma conta? <a href="/signup">Cadastrar</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
