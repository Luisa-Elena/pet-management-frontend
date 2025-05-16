import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { apiUtil } from "../../../utils/apiUtil";
import UserPet from "./components/UserPet";
import "./PetUserPage.css";
import UserPetDetailsModal from "./modals/UserPetDetailsModal";
import { useAuth } from "../../../context/AuthContext";

type PetType = {
  id: string;
  name: string;
  description: string;
  speciesName: string;
  imageUrl: string | null;
  isAdopted: boolean;
};

type PaginatedResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  elements: PetType[];
};

type Species = {
  id: string;
  name: string;
};

export default function PetUserPage() {
  const [pets, setPets] = useState<PetType[]>([]);
  const [error, setError] = useState<string>("");
  const [speciesFilter, setSpeciesFilter] = useState<string>("");
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    totalPages: 0,
  });
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null);
  const navigate =  useNavigate();
  const { userInfo } = useAuth();

  const fetchPets = async (pageNumber: number = 0) => {
    setError("");

    const params = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: "12",
      isAdopted: "false",
    });

    if (speciesFilter) {
      params.append("species", speciesFilter);
    }

    try {
      const data: PaginatedResponse = await apiUtil(
        `http://localhost:8777/api/v1/pets?${params.toString()}`
      );
      setPets(data.elements);
      setPagination({
        pageNumber: data.pageNumber,
        totalPages: data.totalPages,
      });
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchSpecies = async () => {
    try {
      const speciesData: Species[] = await apiUtil("http://localhost:8777/api/v1/species");
      setSpeciesList(speciesData);
    } catch (err: any) {
      setError("Failed to fetch species list: " + err.message);
    }
  };

  const viewPetDetails = (id: string) => {
    const pet = pets.find((p) => p.id === id);
    if (pet)
      setSelectedPet(pet);
  };

  const handleAdoptionRequest = async (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    if (!pet || !userInfo?.email) {
      alert("Pet or user information is missing.");
      return;
    }

    const adoptionData = {
      userEmail: userInfo.email,
      petName: pet.name
    };

    try {
      await apiUtil("http://localhost:8777/api/v1/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(adoptionData)
      });

      alert(`Adoption request for "${pet.name}" submitted successfully!`);

      setSelectedPet(null);
    } catch (err: any) {
      console.error("Adoption request failed:", err);
      alert("Failed to send adoption request: " + err.message);
    }
  };

  useEffect(() => {
    fetchPets(0);
  }, [speciesFilter]);

  useEffect(() => {
    fetchSpecies();
  }, []);

  return (
    <div className="user-pet-page">
      <h2 className="page-title">Available Pets</h2>

      <button className="go-back-btn" onClick={() => navigate("/user-dashboard")}>
        Go Back
      </button>

      <div className="filters">
        <label>
          Species:
          <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
            <option value="">All</option>
            {speciesList.map((species) => (
              <option key={species.id} value={species.name}>
                {species.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      {pets.length > 0 ? (
        <div className="pets-list">
          {pets.map((pet) => (
            <UserPet key={pet.id} {...pet} onView={viewPetDetails}/>
          ))}
        </div> 
      ) : (
        <div className="no-pets-message">No pets found.</div>
      )}

      {selectedPet && (
        <UserPetDetailsModal pet={selectedPet} onClose={() => setSelectedPet(null)} handleAdoptionRequest={handleAdoptionRequest} />
      )}

      {pagination.totalPages > 1 && (
        <div className="pagination-footer">
          <button
            disabled={pagination.pageNumber === 0}
            onClick={() => fetchPets(pagination.pageNumber - 1)}
          >
            Previous
          </button>
          <button
            disabled={pagination.pageNumber === pagination.totalPages - 1}
            onClick={() => fetchPets(pagination.pageNumber + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
