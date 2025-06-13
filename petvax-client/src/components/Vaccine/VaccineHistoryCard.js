import React from "react";
import "../../screens/PetScreen/PetScreen.css";

const VaccineHistoryCard = ({ history }) => (
  <div className="pet-history-card">
    <div className="vaccine-title">Histórico de Vacinas</div>
    <div className="vaccine-list">
      {history && history.length > 0 ? (
        history.map((v, idx) => (
          <div className="vaccine-list-item" key={idx}>
            <div>
              <strong>Nome:&nbsp;</strong>
              <span className="vaccine-name">{v.name}</span>
            </div>
            <div>
              <strong>Aplicação:&nbsp;</strong>
              <span className="vaccine-date">{v.applicationDate}</span>
            </div>
            <div>
              <strong>Validade:&nbsp;</strong>
              <span className="vaccine-date">{v.expireDate}</span>
            </div>
            <div>
              <strong>Veterinário:&nbsp;</strong>
              <span className="vaccine-vet">{v.veterinario || v.vet || "-"}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="vaccine-list-item">Nenhuma vacina registrada.</div>
      )}
    </div>
  </div>
);

export default VaccineHistoryCard;