import React, { useState } from "react";
import classesButton from "../../components/UI/Button/Button.module.css";
import classesForm from "../../components/UI/Form/Form.module.css";
import classesInput from "../../components/UI/Input/Input.module.css";
import classesTextLink from "../../components/UI/TextLink/TextLink.module.css";

const EyeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="12" rx="9" ry="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const EyeOffIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.36-4.77 6-6"/>
    <path d="M1 1l22 22"/>
    <path d="M9.53 9.53a3.5 3.5 0 0 0 4.95 4.95"/>
    <path d="M14.47 14.47A3.5 3.5 0 0 1 9.53 9.53"/>
    <path d="M12 5c5 0 9.27 3.11 11 7-1.21 2.61-3.36 4.77-6 6"/>
  </svg>
);

const LoginScreen = ({ onRegisterClick, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    try {
      const response = await fetch("/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });
      const data = await response.json();
      if (response.ok) {
        window.alert("Login successful!");
        if (typeof onLoginSuccess === "function") onLoginSuccess();
      } else {
        setLoginError(data.error || "Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      setLoginError("Erro de rede.");
    }
    setIsLoading(false);
  };

  const handleRegisterPress = () => {
    if (onRegisterClick) onRegisterClick();
  };

  const handleForgotPassword = () => {
    window.alert("Navegar para recuperação de senha...");
  };

  return (
    <div className="app-container">
      <form className={classesForm.formContainer} onSubmit={handleLogin}>
        <h1>Login</h1>

        {/* Email input */}
        <div className={classesInput.inputWrapper}>
          <input
            type="email"
            className={classesInput.input}
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            id="email-input"
            autoFocus
          />
          <label className={classesInput.floatingLabel} htmlFor="email-input">
            Email
          </label>
        </div>

        {/* Password input */}
        <div className={classesInput.inputWrapper}>
          <input
            id="password-input"
            type={showPassword ? "text" : "password"}
            className={classesInput.input}
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="none"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <label className={classesInput.floatingLabel} htmlFor="password-input">
            Senha
          </label>
          {password && (
            <button
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShowPassword((v) => !v)}
              className={classesInput.inputIconButton}
              tabIndex={0}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>

        {/* Error message */}
        {loginError && (
          <div className={classesInput.inputErrorMsg}>
            {loginError}
          </div>
        )}

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button
            type="button"
            className={classesTextLink.loginLinkButton}
            onClick={handleForgotPassword}
          >
            <span className={classesTextLink.loginLink}>Esqueceu a senha?</span>
          </button>
        </div>

        <button
          type="submit"
          className={classesButton.button}
          disabled={!email || !password || isLoading}
        >
          {isLoading ? "Carregando..." : <span className={classesButton.buttonText}>Entrar</span>}
        </button>

        <div className={classesTextLink.loginTextContainer}>
          <p className={classesTextLink.loginText}>
            Não tem uma conta?
          </p>
          <button
            type="button"
            onClick={handleRegisterPress}
            className={classesTextLink.loginLinkButton}
          >
            <span className={classesTextLink.loginLink}>Cadastre-se</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;