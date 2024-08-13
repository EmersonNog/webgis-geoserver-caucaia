import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa os estilos
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import logo from '../../assets/images/logo.png';
import './SignUp.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Hook para navegação

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(`Input changed: ${id} = ${value}`);
  };

  const handleSubmit = async () => {
    const { name, username, email, password, confirmPassword } = formData;

    // Verificar se todos os campos estão preenchidos
    if (!name || !username || !email || !password || !confirmPassword) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    // Verificar se o e-mail é válido
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('E-mail inválido.');
      return;
    }

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      toast.error('Senhas não coincidem.');
      return;
    }

    // Verificar se a senha tem pelo menos 6 caracteres
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Usuário cadastrado com sucesso!', {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.log('Resposta de erro:', errorData);
        if (errorData.error === 'email_exists') {
          toast.error('E-mail já existe.');
        } else if (errorData.error === 'username_exists') {
          toast.error('Usuário já existe.');
        } else {
          toast.error('Erro ao cadastrar usuário');
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao conectar ao servidor!');
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (step < 2) setStep(step + 1);
    },
    onSwipedRight: () => {
      if (step > 1) setStep(step - 1);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="register-container">
      <div className="register-image">
        <img src={logo} alt="Register Illustration" />
      </div>
      <div className="register-form" {...handlers}>
        <h2>Cadastro</h2>
        <form>
          {step === 1 && (
            <>
              <div className="input-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Nome de usuário"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="register-options">
                <div></div> {/* Empty div for alignment */}
                <button
                  type="button"
                  className="next-button"
                  onClick={() => setStep(2)}
                >
                  Próximo
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirmar senha"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="register-options">
                <button type="button" onClick={() => setStep(1)}>
                  Voltar
                </button>
                <button type="button" onClick={handleSubmit}>
                  Cadastrar
                </button>
              </div>
            </>
          )}
        </form>
        <div className="step-indicators">
          <div className={`step-indicator ${step === 1 ? 'active' : ''}`}></div>
          <div className={`step-indicator ${step === 2 ? 'active' : ''}`}></div>
        </div>
        <p>
          Já tem uma conta? <a href="/login">Login</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
