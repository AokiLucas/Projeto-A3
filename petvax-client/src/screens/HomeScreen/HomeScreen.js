import React from "react";
import Header from "../../components/Header/Header";
import PetInfo from "../../components/PetInfo/PetInfo";
import UpcomingVaccinesCard from "../../components/Vaccine/UpcomingVaccinesCard";
import buttonStyles from "../../components/UI/Button/Button.module.css";
import formStyles from "../../components/UI/Form/Form.module.css";
import "./HomeScreen.css";

const HomeScreen = ({ pets, onPetClick, onAddPet, onLogout, darkMode, onToggleDarkMode }) => (
  <div className="app-container">
    <Header
      title="Pets"
      showBack={false}
      onLogout={onLogout}
      darkMode={darkMode}
      onToggleDarkMode={onToggleDarkMode}
      hideMenu={false} 
    />
    <div className="form-scroll-area">
      <div className="home-content">
        {pets.map((pet) => (
          <div
            className={formStyles.formContainer}
            key={pet.id}
            style={{ cursor: "pointer" }}
            onClick={() => onPetClick(pet)}
          >
            <PetInfo pet={pet} />
            <UpcomingVaccinesCard vaccines={pet.vacinas?.slice(0, 1) || []} isHomeCard />
          </div>
        ))}
        <div className="card-width">
          <button
            className={buttonStyles.button}
            aria-label="Add Pet"
            onClick={onAddPet} 
          >
            <span className={buttonStyles.buttonText}>+ Add Pet</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HomeScreen;
