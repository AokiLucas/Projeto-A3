import React from "react";
import styles from "./PetInfo.module.css";

function formatDateBR(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const PetInfo = ({ pet, showExtraInfo }) => {
  if (!pet) return null;

  return (
    <div className={styles.petInfoWrapper}>
      <div className={styles["pet-header"]}>
        <img src={pet.avatar} alt={pet.name} className={styles["pet-avatar"]} />
        <div>
          <div className={styles["pet-name"]}>{pet.name}</div>
          <div className={styles["pet-info"]}>
            <span className={styles["pet-race"]}>{pet.race}</span> -{" "}
            <span className={styles["pet-breed"]}>{pet.breed}</span>
          </div>
          <div className={styles["pet-details"]}>
            <span className={styles["pet-gender"]}>{pet.gender}</span> -{" "}
            <span className={styles["pet-birthday"]}>
              {formatDateBR(pet.birthday)}
            </span>
          </div>
          {showExtraInfo && (
            <>
              <div className={styles["pet-extra"]}>
                <strong>Peso:</strong> {pet.weight} kg
              </div>
              <div className={styles["pet-extra"]}>
                <strong>Observações:</strong> {pet.notes}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetInfo;