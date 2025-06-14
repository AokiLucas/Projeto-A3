import React, { useState, useEffect } from "react";
import RegisterUser from "./screens/RegisterScreen/RegisterScreen";
import LoginUser from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PetScreen from "./screens/PetScreen/PetScreen";
import RegisterPetScreen from "./screens/RegisterPetScreen/RegisterPetScreen";
import RegisterVaccineScreen from "./screens/RegisterVaccine/RegisterVaccine";
import EditPetScreen from "./screens/EditPetScreen/EditPetScreen";

const getSystemDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const App = () => {
  const [screen, setScreen] = useState("login");
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [user, setUser] = useState(null);
  const [vaccinePet, setVaccinePet] = useState(null);
  const [darkMode, setDarkMode] = useState(getSystemDarkMode());

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Listen for system color scheme changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => setDarkMode(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Fetch pets for the logged-in user
  const fetchPets = async () => {
    const response = await fetch("/api/pet/with-vaccines", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      // Map backend fields to frontend fields
      const mappedPets = data.map((pet) => ({
        id: pet.id,
        name: pet.nome,
        race: pet.especie,
        breed: pet.raca,
        birthday: pet.dataNascimento
          ? pet.dataNascimento.split("/").reverse().join("-")
          : "",
        gender: pet.sexo,
        weight: pet.peso,
        notes: pet.observacoes,
        avatar: pet.fotoUrl,
        vacinas: pet.vacinas || [],
        upcomingVaccines: pet.upcomingVaccines || [],
        vaccineHistory: pet.vaccineHistory || [],
      }));
      setPets(mappedPets);
      return mappedPets;
    }
    return [];
  };

  // Called after successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setScreen("home");
    fetchPets();
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setScreen("pet");
  };

  const handleRegisterPet = async ({ petDto }) => {
    // Map frontend fields to backend fields
    const petDtoMapped = {
      Nome: petDto.name,
      Especie: petDto.race,
      Raca: petDto.breed,
      DataNascimento: petDto.birthday ? new Date(petDto.birthday).toISOString() : null,
      Sexo: petDto.gender === "Macho" ? "M" : "F",
      Peso: petDto.weight,
      Observacoes: petDto.notes,
      FotoUrl: petDto.avatar,
      Vacinas: (petDto.vacinas || []).map(v => ({
        Id: v.id,
        NomeVacina: v.name,
        DataAplicacao: v.applicationDate ? new Date(v.applicationDate).toISOString() : null,
        LoteVacinal: v.lot,
        ValidadeImunizante: v.expireDate ? new Date(v.expireDate).toISOString() : null,
        Veterinario: v.veterinario,
      })),
    };
  
    const response = await fetch("/api/pet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(petDtoMapped),
    });
    if (response.ok) {
      fetchPets(); 
      setScreen("home");
    } else {
      alert("Erro ao cadastrar pet.");
    }
  };

  const handleRegisterVaccine = async (vaccine) => {
    if (!vaccinePet) return;
    const response = await fetch(`/api/pet/${vaccinePet.id}/vaccine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(vaccine),
    });
    if (response.ok) {
      const updatedPets = await fetchPets();
      setScreen("pet");
      setSelectedPet(updatedPets.find((p) => p.id === vaccinePet.id));
      setVaccinePet(null);
    } else {
      alert("Erro ao cadastrar vacina.");
    }
  };

  const handleEditPetSave = async ({ petDto }) => {
    await fetch(`/api/pet/${petDto.Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(petDto),
    });
    const updatedPets = await fetchPets();
    // Find and set the updated pet
    setSelectedPet(updatedPets.find((p) => p.id === petDto.Id));
    setScreen("pet");
  };

  const handleAddPetClick = () => setScreen("register-pet");
  const handleAddVaccineClick = (pet) => {
    setVaccinePet(pet);
    setScreen("register-vaccine");
  };

  const handleLogout = async () => {
    // Optional: Call backend to clear session
    await fetch("/api/Auth/logout", { method: "POST", credentials: "include" }).catch(() => {});
    setUser(null);
    setScreen("login");
  };

  const handleToggleDarkMode = () => setDarkMode((v) => !v);

  const handleDeletePet = async (pet) => {
    if (!window.confirm("Deseja realmente excluir este pet?")) return;
    const response = await fetch(`/api/pet/${pet.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      await fetchPets(); // Refresh the pet list
      setScreen("home"); // Go back to home or wherever you want
    } else {
      alert("Erro ao excluir pet.");
    }
  };

  if (screen === "login") {
    return (
      <LoginUser
        onRegisterClick={() => setScreen("register")}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }
  if (screen === "register") {
    return (
      <RegisterUser
        onLoginClick={() => setScreen("login")}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }
  if (screen === "home") {
    return (
      <HomeScreen
        pets={pets}
        onPetClick={handlePetClick}
        onAddPet={handleAddPetClick}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
    );
  }
  if (screen === "pet" && selectedPet) {
    return (
      <PetScreen
        pet={selectedPet}
        onBack={() => setScreen("home")}
        onAddVaccine={handleAddVaccineClick}
        onEditPet={() => setScreen("edit-pet")}
        onDeletePet={handleDeletePet} // <-- Add this line
      />
    );
  }
  if (screen === "register-pet") {
    return (
      <RegisterPetScreen
        onBack={() => setScreen("home")}
        onRegister={handleRegisterPet}
      />
    );
  }
  if (screen === "register-vaccine" && vaccinePet) {
    return (
      <RegisterVaccineScreen
        onBack={() => {
          setScreen("pet");
          setVaccinePet(null);
        }}
        onRegister={handleRegisterVaccine}
        pet={vaccinePet}
      />
    );
  }
  if (screen === "edit-pet" && selectedPet) {
    return (
      <EditPetScreen
        pet={selectedPet}
        onBack={() => setScreen("pet")}
        onSave={handleEditPetSave}
      />
    );
  }
  return null;
};

export default App;
