import React, { useState, useEffect } from "react";
import RegisterUser from "./screens/RegisterScreen/RegisterScreen";
import LoginUser from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PetScreen from "./screens/PetScreen/PetScreen";
import RegisterPetScreen from "./screens/RegisterPetScreen/RegisterPetScreen";
import RegisterVaccineScreen from "./screens/RegisterVaccine/RegisterVaccine";

const getSystemDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const App = () => {
  // Use system preference for initial value
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

  const [screen, setScreen] = useState("login");
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [user, setUser] = useState(null);
  const [vaccinePet, setVaccinePet] = useState(null);

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
        birthday: pet.dataNascimento?.split("T")[0] || "",
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

  const handleRegisterPet = async (pet) => {
    const response = await fetch("/api/pet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(pet),
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
  return null;
};

export default App;
