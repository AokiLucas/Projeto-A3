import React from "react";
import Header from "../../components/Header/Header";
import PetInfo from "../../components/PetInfo/PetInfo";
import UpcomingVaccinesCard from "../../components/Vaccine/UpcomingVaccinesCard";
import VaccineHistoryCard from "../../components/Vaccine/VaccineHistoryCard";
import formStyles from "../../components/UI/Form/Form.module.css";
import styles from "../../components/UI/Button/Button.module.css";

const PetScreen = ({ pet, onBack, onAddVaccine }) => (
  <div className="app-container">
    <Header title="Pet Details" showBack={true} onBack={onBack} />
    <div className="form-scroll-area">
      <div className={formStyles.formContainer}>
        <PetInfo pet={pet} showExtraInfo />
        <UpcomingVaccinesCard vaccines={pet.upcomingVaccines} />
        <VaccineHistoryCard history={pet.vaccineHistory} />
        <button className={styles.button} onClick={() => onAddVaccine(pet)}>
          <span className={styles.buttonText}>+ Add Vaccine</span>
        </button>
      </div>
    </div>
  </div>
);

export default PetScreen;
