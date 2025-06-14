import React from "react";
import Header from "../../components/Header/Header";
import PetInfo from "../../components/PetInfo/PetInfo";
import UpcomingVaccinesCard from "../../components/Vaccine/UpcomingVaccinesCard";
import VaccineHistoryCard from "../../components/Vaccine/VaccineHistoryCard";
import formStyles from "../../components/UI/Form/Form.module.css";
import styles from "../../components/UI/Button/Button.module.css";

const EditIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--brand-color-main)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
  </svg>
);

const TrashIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-error, #dc3545)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const PetScreen = ({ pet, onBack, onAddVaccine, onEditPet, onDeletePet }) => (
  <div className="app-container">
    <Header
      title="Pet Details"
      showBack={true}
      onBack={onBack}
      hideMenu={false}
      menuItems={[
        {
          label: "Editar",
          icon: EditIcon,
          onClick: () => onEditPet && onEditPet(pet),
        },
        {
          label: "Excluir",
          icon: TrashIcon,
          onClick: () => {
            if (window.confirm("Deseja realmente excluir este pet?")) {
              onDeletePet && onDeletePet(pet);
            }
          },
        },
      ]}
    />
    <div className="form-scroll-area">
      <div
        className={formStyles.formContainer}
        style={{ position: "relative" }}
      >
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
