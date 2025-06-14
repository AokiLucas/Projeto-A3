import React, { useState } from "react";
import Header from "../../components/Header/Header";
import classesButton from "../../components/UI/Button/Button.module.css";
import classesForm from "../../components/UI/Form/Form.module.css";
import classesInput from "../../components/UI/Input/Input.module.css";

const RegisterPetScreen = ({ onBack, onRegister }) => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [breed, setBreed] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !race || !breed || !birthday || !gender || !weight) {
      alert("Preencha todos os campos obrigatórios.");
      setIsLoading(false);
      return;
    }

    const pet = {
      name,
      race,
      breed,
      birthday,
      gender,
      weight: weight ? parseFloat(weight) : null,
      notes,
      avatar: preview || "",
      vacinas: [],
    };
    if (onRegister) await onRegister({ petDto: pet });

    setIsLoading(false);
  };

  const isPetFormValid =
    name.trim() &&
    race.trim() &&
    breed.trim() &&
    birthday &&
    gender &&
    weight;

  return (
    <div className="app-container">
      <Header
        title="Cadastrar Pet"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              id="name-input"
            />
            <label className={classesInput.floatingLabel} htmlFor="name-input">
              Nome
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="text"
              className={classesInput.input}
              placeholder=" "
              value={race}
              onChange={(e) => setRace(e.target.value)}
              required
              id="race-input"
            />
            <label className={classesInput.floatingLabel} htmlFor="race-input">
              Espécie
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="text"
              className={classesInput.input}
              placeholder=" "
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
              id="breed-input"
            />
            <label className={classesInput.floatingLabel} htmlFor="breed-input">
              Raça
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="date"
              className={classesInput.input}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
              id="birthday-input"
            />
            <label
              className={classesInput.floatingLabel}
              htmlFor="birthday-input"
            >
              Data de Nascimento
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <select
              className={classesInput.input}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              id="gender-input"
            >
              <option value="">Selecione o sexo</option>
              <option value="Male">Macho</option>
              <option value="Female">Fêmea</option>
            </select>
            <label
              className={classesInput.floatingLabel}
              htmlFor="gender-input"
            >
              Sexo
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <input
              type="number"
              className={classesInput.input}
              placeholder=" "
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="0.01"
              id="weight-input"
            />
            <label
              className={classesInput.floatingLabel}
              htmlFor="weight-input"
            >
              Peso (kg)
            </label>
          </div>

          <div className={classesInput.inputWrapper}>
            <textarea
              className={classesInput.input}
              placeholder=" "
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="notes-input"
              rows={3}
              style={{ resize: "none" }}
            />
            <label className={classesInput.floatingLabel} htmlFor="notes-input">
              Observações
            </label>
          </div>

          <div
            className={classesInput.inputWrapper}
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <label
              style={{ marginBottom: 8, fontWeight: 500 }}
              htmlFor="avatar-input"
            >
              Foto do Pet
            </label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="avatar-input"
              style={{ display: "none" }}
            />
            <button
              type="button"
              className={classesButton.button}
              onClick={() => document.getElementById("avatar-input").click()}
              style={{
                marginBottom: 8,
                padding: "2px 8px",
                fontSize: "0.75rem",
              }}
            >
              <span className={classesButton.buttonText}>Escolher arquivo</span>
            </button>
            {avatar && <span style={{ marginBottom: 8 }}>{avatar.name}</span>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ marginTop: 10, maxWidth: 120, borderRadius: 8 }}
              />
            )}
          </div>

          <button
            type="submit"
            className={classesButton.button}
            disabled={!isPetFormValid || isLoading}
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

function toISODate(dateStr) {
  if (!dateStr) return null;
  // If already ISO, return as is
  if (dateStr.includes("T")) return dateStr;
  // If format is dd/MM/yyyy, convert to yyyy-MM-dd
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}T00:00:00`).toISOString();
  }
  // If format is yyyy-MM-dd, convert directly
  if (dateStr.includes("-")) return new Date(dateStr).toISOString();
  return null;
}

export default RegisterPetScreen;
