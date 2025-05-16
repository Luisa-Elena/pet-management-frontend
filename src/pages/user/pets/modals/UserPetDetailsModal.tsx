import React from "react";
import "./UserPetDetailsModal.css";

type PetType = {
  id: string;
  name: string;
  description: string;
  speciesName: string;
  imageUrl: string | null;
  isAdopted: boolean;
};

type UserPetDetailsModalProps = {
  pet: PetType;
  onClose: () => void;
  handleAdoptionRequest: (id: string) => void
};

export default function UserPetDetailsModal({ pet, onClose, handleAdoptionRequest }: UserPetDetailsModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{pet.name} ({pet.speciesName})</h2>
        {pet.imageUrl && (
          <img src={pet.imageUrl} alt={pet.name} className="modal-image" />
        )}
        <p className="modal-description">{pet.description}</p>
        <div className="center-button">
          <button onClick={() => handleAdoptionRequest(pet.id)} className="adoption-btn">
            Make Adoption Request
          </button>
        </div>
      </div>
    </div>
  );
}
