import "./UserPet.css";

type PetProps = {
  id: string;
  name: string;
  description: string;
  speciesName: string;
  imageUrl: string | null;
  isAdopted: boolean;
  onView: (id: string) => void;
};

export default function UserPet({
  id,
  name,
  description,
  speciesName,
  imageUrl,
  isAdopted,
  onView,
}: PetProps) {
  return (
    <div className="pet-container">
      <p className="pet-species">{speciesName}</p>

      {imageUrl && <img className="pet-image" src={imageUrl} alt={name} />}

      <h3 className="pet-name">{name}</h3>
      <p className="pet-description">{description}</p>

      <div className="pet-actions">
        <button onClick={() => onView(id)} className="btn details-btn">
          View
        </button>
      </div>
      
    </div>
  );
}
