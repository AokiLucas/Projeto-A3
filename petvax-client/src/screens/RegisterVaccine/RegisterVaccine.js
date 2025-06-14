import React, { useState } from "react";
import Header from "../../components/Header/Header";
import classesButton from "../../components/UI/Button/Button.module.css";
import classesForm from "../../components/UI/Form/Form.module.css";
import classesInput from "../../components/UI/Input/Input.module.css";

const RegisterVaccineScreen = ({ onBack, onRegister }) => {
  const [lot, setLot] = useState("");
  const [name, setName] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicationDate || !expireDate) {
      alert("Preencha as datas de aplicação e validade.");
      return;
    }

    setIsLoading(true);

    const vaccine = {
      lot,
      name,
      applicationDate,
      expireDate,
      veterinario,
    };

    if (onRegister) await onRegister(vaccine);

    setIsLoading(false);
  };

  const isVaccineFormValid =
    lot.trim() &&
    name.trim() &&
    applicationDate &&
    expireDate &&
    veterinario.trim();

  return (
    <div className="app-container">
      <Header
        title="Cadastrar Vacina"
        showBack={true}
        onBack={onBack}
        hideMenu={true}
      />
      <div className="form-scroll-area">
        <form className={classesForm.formContainer} onSubmit={handleSubmit}>
          <div className={classesInput.inputWrapper}>
            <input
              type="text"
              className={classesInput.input}
              placeholder=" "
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              required
              id="lot-input"
            />
            <label className={classesInput.floatingLabel} htmlFor="lot-input">
              Lote
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="text"
              className={classesInput.input}
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              id="name-input"
            />
            <label className={classesInput.floatingLabel} htmlFor="name-input">
              Nome da Vacina
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="date"
              className={classesInput.input}
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              required
              id="application-date-input"
            />
            <label
              className={classesInput.floatingLabel}
              htmlFor="application-date-input"
            >
              Data de Aplicação
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="date"
              className={classesInput.input}
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              required
              id="expire-date-input"
            />
            <label
              className={classesInput.floatingLabel}
              htmlFor="expire-date-input"
            >
              Data de Validade
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="text"
              className={classesInput.input}
              placeholder=" "
              value={veterinario}
              onChange={(e) => setVeterinario(e.target.value)}
              required
              id="veterinario-input"
            />
            <label
              className={classesInput.floatingLabel}
              htmlFor="veterinario-input"
            >
              Veterinário
            </label>
          </div>

          <button
            type="submit"
            className={classesButton.button}
            disabled={!isVaccineFormValid || isLoading}
          >
            {isLoading ? (
              "Cadastrando..."
            ) : (
              <span className={classesButton.buttonText}>Cadastrar</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVaccineScreen;
