import React from "react";
import Header from "../../components/Header/Header";
import PetInfo from "../../components/PetInfo/PetInfo";
import UpcomingVaccinesCard from "../../components/Vaccine/UpcomingVaccinesCard";
import buttonStyles from "../../components/UI/Button/Button.module.css";
import formStyles from "../../components/UI/Form/Form.module.css";
import "./HomeScreen.css";

const SunIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-color-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2" />
    <path d="M12 21v2" />
    <path d="M4.22 4.22l1.42 1.42" />
    <path d="M18.36 18.36l1.42 1.42" />
    <path d="M1 12h2" />
    <path d="M21 12h2" />
    <path d="M4.22 19.78l1.42-1.42" />
    <path d="M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-color-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

const LogoutIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-color-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const HomeScreen = ({ pets, onPetClick, onAddPet, onLogout, darkMode, onToggleDarkMode }) => (
  <div className="app-container">
    <Header
      title="Pets"
      showBack={false}
      hideMenu={false}
      menuItems={[
        {
          label: darkMode ? "Light Mode" : "Dark Mode",
          icon: darkMode ? SunIcon : MoonIcon,
          onClick: onToggleDarkMode,
        },
        {
          label: "Logout",
          icon: LogoutIcon,
          onClick: onLogout,
        },
      ]}
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
