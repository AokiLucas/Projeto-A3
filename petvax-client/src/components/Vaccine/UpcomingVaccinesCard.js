import React from "react";
import "../../screens/PetScreen/PetScreen.css";

const UpcomingVaccinesCard = ({ vaccines, isHomeCard }) => (
  <div className="pet-vaccine-card">
    <div className="vaccine-title">Próxima Vacinação</div>
    <div className="vaccine-list">
      {vaccines && vaccines.length > 0 ? (
        vaccines.map((v, idx) => (
          <div className="vaccine-list-item" key={idx}>
            <div>
              <strong>Nome:&nbsp;</strong>
              <span className={isHomeCard ? "upcoming-vaccine-name-home" : "vaccine-name"}>
                {v.name}
              </span>
            </div>
            <div>
              <strong>Aplicação:&nbsp;</strong>
              <span className="vaccine-date">{v.applicationDate}</span>
            </div>
            <div>
              <strong>Veterinário:&nbsp;</strong>
              <span className="vaccine-vet">{v.veterinario || v.vet || "-"}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="vaccine-list-item">Nenhuma vacinação futura.</div>
      )}
    </div>
  </div>
);

export default UpcomingVaccinesCard;