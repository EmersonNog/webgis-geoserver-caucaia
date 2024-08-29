import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./SignUp.css";
import api from "../../Config/Api";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(`Input changed: ${id} = ${value}`);
  };

  const handleSubmit = async () => {
    const { name, username, email, password, confirmPassword } = formData;

    if (!name || !username || !email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("E-mail inválido.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await api.post("/register", {
        name,
        username,
        email,
        password,
      });

      toast.success("Usuário cadastrado com sucesso!", {
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Erro:", error);
      const errorData = error.response?.data;

      if (errorData?.error === "email_exists") {
        toast.error("E-mail já existe.");
      } else if (errorData?.error === "username_exists") {
        toast.error("Usuário já existe.");
      } else {
        toast.error("Erro ao cadastrar usuário");
      }
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
                <div></div>
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
          <div className={`step-indicator ${step === 1 ? "active" : ""}`}></div>
          <div className={`step-indicator ${step === 2 ? "active" : ""}`}></div>
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
