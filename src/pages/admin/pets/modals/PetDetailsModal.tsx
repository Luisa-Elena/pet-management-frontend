import React from "react";
import "./PetDetailsModal.css";

type PetType = {
  id: string;
  name: string;
  description: string;
  speciesName: string;
  imageUrl: string | null;
  isAdopted: boolean;
};

type PetDetailsModalProps = {
  pet: PetType;
  onClose: () => void;
};

export default function PetDetailsModal({ pet, onClose }: PetDetailsModalProps) {
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
        <p><strong>Status:</strong> {pet.isAdopted ? "Adopted" : "Available"}</p>
        <p className="modal-description">{pet.description}</p>
      </div>
    </div>
  );
}
