import React, { useState } from "react";
import Header from "../../components/Header/Header";
import classesButton from "../../components/UI/Button/Button.module.css";
import classesForm from "../../components/UI/Form/Form.module.css";
import classesInput from "../../components/UI/Input/Input.module.css";

const EditPetScreen = ({ pet, onBack, onSave }) => {
  const [form, setForm] = useState({
    name: pet.name || "",
    race: pet.race || "",
    breed: pet.breed || "",
    birthday: pet.birthday || "",
    gender: pet.gender || "",
    weight: pet.weight || "",
    notes: pet.notes || "",
    avatar: pet.avatar || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(pet.avatar || "");
  const [vaccines, setVaccines] = useState(pet.vacinas || []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteVaccine = (id) => {
    setVaccines(vaccines.filter((v) => v.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Helper to convert dd/MM/yyyy or yyyy-MM-dd to ISO string
    function toISODate(dateStr) {
      if (!dateStr) return null;
      if (dateStr.includes("T")) return dateStr;
      if (dateStr.includes("/")) {
        // dd/MM/yyyy to yyyy-MM-dd
        const [day, month, year] = dateStr.split("/");
        return new Date(`${year}-${month}-${day}T00:00:00`).toISOString();
      }
      if (dateStr.includes("-")) return new Date(dateStr).toISOString();
      return null;
    }

    // Validate required vaccine fields
    for (const v of vaccines) {
      if (
        !v.name ||
        !v.applicationDate ||
        !v.expireDate ||
        !v.lot ||
        !v.veterinario
      ) {
        alert("Preencha todos os campos obrigatórios das vacinas.");
        return;
      }
      // Validate date conversion
      if (!toISODate(v.applicationDate) || !toISODate(v.expireDate)) {
        alert("Datas de vacina inválidas.");
        return;
      }
    }

    const petDto = {
      Id: pet.id, // <-- Add this line!
      Nome: form.name,
      Especie: form.race,
      Raca: form.breed,
      DataNascimento: toISODate(form.birthday),
      Sexo: form.gender === "Macho" ? "M" : "F",
      Peso: form.weight,
      Observacoes: form.notes,
      FotoUrl: preview,
      Vacinas: vaccines.map((v) => ({
        Id: v.id,
        NomeVacina: v.name,
        DataAplicacao: toISODate(v.applicationDate),
        LoteVacinal: v.lot,
        ValidadeImunizante: toISODate(v.expireDate),
        Veterinario: v.veterinario,
      })),
    };

    onSave({ petDto });
  };

  return (
    <div className="app-container">
      <Header title="Editar Pet" showBack={true} onBack={onBack} hideMenu={true} />
      <div className="form-scroll-area">
        <div className="home-content">
          <form className={classesForm.formContainer} onSubmit={handleSubmit}>
            {/* Pet Data Inputs */}
            <div className={classesInput.inputWrapper}>
              <input
                type="text"
                className={classesInput.input}
                placeholder=" "
                name="name"
                value={form.name}
                onChange={handleChange}
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
                name="race"
                value={form.race}
                onChange={handleChange}
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
                name="breed"
                value={form.breed}
                onChange={handleChange}
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
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
                required
                id="birthday-input"
              />
              <label className={classesInput.floatingLabel} htmlFor="birthday-input">
                Data de Nascimento
              </label>
            </div>
            <div className={classesInput.inputWrapper}>
              <select
                className={classesInput.input}
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                id="gender-input"
              >
                <option value="">Selecione o sexo</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
              <label className={classesInput.floatingLabel} htmlFor="gender-input">
                Sexo
              </label>
            </div>
            <div className={classesInput.inputWrapper}>
              <input
                type="number"
                className={classesInput.input}
                placeholder=" "
                name="weight"
                value={form.weight}
                onChange={handleChange}
                min="0"
                step="0.01"
                id="weight-input"
              />
              <label className={classesInput.floatingLabel} htmlFor="weight-input">
                Peso (kg)
              </label>
            </div>
            <div className={classesInput.inputWrapper}>
              <textarea
                className={classesInput.input}
                placeholder=" "
                name="notes"
                value={form.notes}
                onChange={handleChange}
                id="notes-input"
                rows={3}
                style={{ resize: "none" }}
              />
              <label className={classesInput.floatingLabel} htmlFor="notes-input">
                Observações
              </label>
            </div>
            {/* Photo */}
            <div
              className={classesInput.inputWrapper}
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <label style={{ marginBottom: 8, fontWeight: 500 }} htmlFor="avatar-input">
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
              {avatarFile && <span style={{ marginBottom: 8 }}>{avatarFile.name}</span>}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ marginTop: 10, maxWidth: 120, borderRadius: 8 }}
                />
              )}
            </div>
            {/* Vaccines List */}
            <div style={{ width: "100%", marginTop: 24 }}>
              <h3 style={{ color: "var(--brand-color-main)", marginBottom: 8 }}>Vacinas</h3>
              <div>
                {vaccines.length === 0 && (
                  <div style={{ color: "#888", fontSize: "0.95em" }}>Nenhuma vacina cadastrada.</div>
                )}
                {vaccines.map((vac) => (
                  <div
                    key={vac.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      background: "var(--color-ui-light)",
                      borderRadius: 8,
                      boxShadow: "0 1px 3px var(--color-shadow-light)",
                      padding: "12px 16px",
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", color: "var(--brand-color-main)" }}>
                        Nome: <span style={{ color: "var(--brand-color-main)" }}>{vac.name}</span>
                      </div>
                      <div style={{ fontWeight: "bold" }}>
                        Aplicação:{" "}
                        <span style={{ fontWeight: "normal", color: "var(--color-text-regular)" }}>
                          {vac.applicationDate || ""}
                        </span>
                      </div>
                      <div style={{ fontWeight: "bold" }}>
                        Validade:{" "}
                        <span style={{ fontWeight: "normal", color: "var(--color-text-regular)" }}>
                          {vac.expireDate || ""}
                        </span>
                      </div>
                      <div style={{ fontWeight: "bold" }}>
                        Lote:{" "}
                        <span style={{ fontWeight: "normal", color: "var(--color-text-regular)" }}>
                          {vac.lot || ""}
                        </span>
                      </div>
                      <div style={{ fontWeight: "bold" }}>
                        Veterinário:{" "}
                        <span style={{ fontWeight: "normal", color: "var(--color-text-regular)" }}>
                          {vac.veterinario}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteVaccine(vac.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 4,
                        marginLeft: 12,
                        marginTop: 2,
                      }}
                      aria-label="Remover vacina"
                      title="Remover vacina"
                    >
                      {/* Inline Trash SVG */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-error, #dc3545)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: 16, width: "100%" }}>
              <button
                type="button"
                className={classesButton.button}
                style={{
                  background: "var(--color-error, #dc3545)",
                  flex: 1,
                  maxWidth: "100%",
                }}
                onClick={onBack}
              >
                <span className={classesButton.buttonText}>Cancelar</span>
              </button>
              <button
                type="submit"
                className={classesButton.button}
                style={{
                  flex: 1,
                  maxWidth: "100%",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm("Deseja realmente salvar as alterações?")) {
                    handleSubmit(e);
                  }
                }}
              >
                <span className={classesButton.buttonText}>Salvar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPetScreen;