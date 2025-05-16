import "./AdminPet.css";

type PetProps = {
  id: string;
  name: string;
  description: string;
  speciesName: string;
  imageUrl: string | null; 
  isAdopted: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
};

export default function AdminPet({
  id,
  name,
  description,
  speciesName,
  imageUrl,
  isAdopted,
  onEdit,
  onDelete,
  onView,
}: PetProps) {
  return (
    <div className="pet-container">
      <p className="pet-species">{speciesName}</p>

      {imageUrl && <img className="pet-image" src={imageUrl} alt={name} />}

      <h3 className="pet-name">
        {name}
      </h3>
      <p className="pet-description">{description}</p>
      <p className={`pet-status ${isAdopted ? "adopted" : "available"}`}>
        Status: <strong>{isAdopted ? "Adopted" : "Available"}</strong>
      </p>

      <div className="pet-actions">
        <button onClick={() => onEdit(id)} className="btn edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(id)} className="btn delete-btn">
          Delete
        </button>
        <button onClick={() => onView(id)} className="btn details-btn">
          View
        </button>
      </div>
    </div>
  );
}
