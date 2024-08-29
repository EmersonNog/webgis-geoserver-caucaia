import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";
import "./Login.css";
import api from "../../Config/Api";

const Login = () => {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({ login: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { login: "", password: "" };

    if (!loginData.login) {
      newErrors.login = "O e-mail ou usuário é obrigatório.";
      valid = false;
    }

    if (!loginData.password) {
      newErrors.password = "A senha é obrigatória.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await api.post("/login", loginData);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/map");
      } else {
        toast.error("Credenciais inválidas");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor");
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={logo} alt="Login Illustration" />
      </div>
      <div className="login-form">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login">E-mail ou Usuário</label>
            <input
              type="text"
              id="login"
              placeholder="Digite seu e-mail ou usuário"
              value={loginData.login}
              onChange={handleInputChange}
              className={errors.login ? "error" : ""}
            />
            {errors.login && (
              <span className="error-message">{errors.login}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={loginData.password}
              onChange={handleInputChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
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
