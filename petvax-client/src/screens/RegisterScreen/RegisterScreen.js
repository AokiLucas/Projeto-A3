// RegisterScreen.js (for React Web)
import React, { useState } from "react";
// Import CSS Modules for your UI components
import classesButton from "../../components/UI/Button/Button.module.css"; // For your Button component's styles
import classesForm from "../../components/UI/Form/Form.module.css"; // For your Form component's styles
import classesInput from "../../components/UI/Input/Input.module.css"; // For your Input component's styles
import classesTextLink from "../../components/UI/TextLink/TextLink.module.css"; // For your TextLink component's styles

// Add this new style for the password input wrapper and show/hide button
const passwordInputWrapperStyle = {
  position: "relative",
  width: "100%",
  marginBottom: "15px",
};
const showHideButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  color: "inherit",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1em",
  padding: 0,
  outline: "none",
};
const iconCircleStyle = (isValid) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "26px",
  height: "26px",
  borderRadius: "50%",
  border: `2px solid ${isValid ? "#6fcf97" : "#dc3545"}`,
  color: isValid ? "#6fcf97" : "#dc3545",
  background: "transparent",
  fontSize: "1.1em",
  marginRight: "4px",
});
const labelStyle = {
  position: "absolute",
  left: "15px",
  top: "8px",
  fontSize: "0.95em",
  color: "#aaa",
  pointerEvents: "none",
  transition: "all 0.2s",
  background: "transparent",
  zIndex: 2,
};

// Eye icon (show password)
const EyeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="12" rx="9" ry="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

// Eye-off icon (hide password)
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

const RegisterScreen = ({ onLoginClick, onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const minPasswordLength = 6;
  const isPasswordValid = password.length >= minPasswordLength;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      window.alert("Error: Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        window.alert("Success: " + data.message);
        if (typeof onLoginSuccess === "function") onLoginSuccess();
      } else {
        window.alert("Error: " + (data.error || "Registration failed"));
      }
    } catch (err) {
      window.alert("Network error");
    }
    setIsLoading(false);
  };

  const handleLoginPress = () => {
    if (onLoginClick) onLoginClick();
  };

  return (
    <div className="app-container">
      <form className={classesForm.formContainer} onSubmit={handleSignUp}>
        <h1>Register</h1>

        {/* Name input */}
        <div className={classesInput.inputWrapper}>
          <input
            type="text"
            className={classesInput.input}
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoCapitalize="words"
            id="name-input"
            autoFocus
          />
          <label className={classesInput.floatingLabel} htmlFor="name-input">
            Nome
          </label>
        </div>

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
            className={[
              classesInput.input,
              password.length > 0 && !isPasswordValid ? classesInput.inputError : "",
              password.length >= minPasswordLength ? classesInput.inputValid : ""
            ].join(" ")}
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
          {/* Eye icon button for show/hide password */}
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
        {/* Password requirements feedback */}
        <div className={classesInput.inputErrorMsg}>
          {password.length > 0 && !isPasswordValid && (
            <>Crie uma senha com pelo menos {minPasswordLength} caracteres.</>
          )}
        </div>

        <button
          type="submit"
          className={classesButton.button}
          disabled={!name || !email || !isPasswordValid || isLoading}
        >
          {isLoading ? "Carregando..." : <span className={classesButton.buttonText}>Sign Up</span>}
        </button>

        <div className={classesTextLink.loginTextContainer}>
          <p className={classesTextLink.loginText}>
            Already have an account?
          </p>
          <button
            type="button"
            onClick={handleLoginPress}
            className={classesTextLink.loginLinkButton}
          >
            <span className={classesTextLink.loginLink}>Log in</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
