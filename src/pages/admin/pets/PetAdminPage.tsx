import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPet from "./components/AdminPet"
import { apiUtil } from "../../../utils/apiUtil";
import PetDetailsModal from "./modals/PetDetailsModal";
import "./PetAdminPage.css"

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

export default function PetAdminPage() {
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null);
  const [pets, setPets] = useState<PetType[]>([]);
  const [error, setError] = useState<string>("");
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    totalPages: 0,
  });
  const [speciesFilter, setSpeciesFilter] = useState<string>(""); // "" = all species
  const [adoptedFilter, setAdoptedFilter] = useState<string>(""); // "" = all, "true" = adopted, "false" = available
  const [speciesList, setSpeciesList] = useState<Species[]>([]);

  const navigate = useNavigate();

  const fetchPets = async (pageNumber: number = 0) => {
    setError("");

    const params = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: "12",
    });

    if (speciesFilter) params.append("species", speciesFilter);
    if (adoptedFilter) params.append("isAdopted", adoptedFilter);

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

  const deletePet = async (id: string) => {
    const petToDelete = pets.find((p) => p.id === id);
    const petName = petToDelete ? petToDelete.name : "this pet";
    const confirmed = window.confirm(`Are you sure you want to delete ${petName}?`);
    if (!confirmed) return;

    try {
      await apiUtil(`http://localhost:8777/api/v1/pets/${id}`, {
        method: "DELETE",
      });
      setPets((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const editPet = (id: string) => {
    navigate(`/admin/pets/update/${id}`);
  };

  const viewPetDetails = (id: string) => {
    const pet = pets.find((p) => p.id === id);
    if (pet)
      setSelectedPet(pet);
  };

  const fetchSpecies = async () => {
    try {
      const speciesData: Species[] = await apiUtil("http://localhost:8777/api/v1/species");
      setSpeciesList(speciesData);
    } catch (err: any) {
      setError("Failed to fetch species list: " + err.message);
    }
  };

  useEffect(() => {
    fetchPets(0);
  }, [speciesFilter, adoptedFilter]);

  useEffect(() => {
    fetchSpecies();
  }, []);

  return (
    <div className="admin-container pets-page">
        <h2 className="admin-title">Manage Pets</h2>
        <div className="button-group">
          <button className="add-pet-btn" onClick={() => navigate("/admin/pets/add")}>
            + Add New Pet
          </button>
          <button className="go-back-btn" onClick={() => navigate("/admin-dashboard")}>
            Go Back
          </button>
        </div>

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
          <label>
            Adoption Status:
            <select value={adoptedFilter} onChange={(e) => setAdoptedFilter(e.target.value)}>
              <option value="">All</option>
              <option value="true">Adopted</option>
              <option value="false">Available</option>
            </select>
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        {selectedPet && (
          <PetDetailsModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
        )}

        {pets.length > 0 ? (
          <div className="pets-list">
          {pets.map((pet) => (
              <AdminPet key={pet.id} {...pet} onEdit={editPet} onDelete={deletePet} onView={viewPetDetails} />
          ))}
          </div>
        ) : (
          <div className="no-pets-message">No pets found.</div>
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
