import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUtil } from "../../../utils/apiUtil";
import "./SpeciesPage.css";

type Species = {
  id: string;
  name: string;
};

export default function SpeciesPage() {
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [newSpeciesName, setNewSpeciesName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchSpecies = async () => {
    setLoading(true);
    setError(null);
    try {
      const speciesData: Species[] = await apiUtil("http://localhost:8777/api/v1/species");
      setSpeciesList(speciesData);
    } catch (err: any) {
      setError("Failed to fetch species list: " + err.message);
    } finally {
      setLoading(false);
    }
  };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newSpeciesName.trim()) {
        setError("Species name cannot be empty.");
        return;
        }

        setError(null);
        try {
        await apiUtil("http://localhost:8777/api/v1/species", {
            method: "POST",
            body: JSON.stringify({ name: newSpeciesName.trim() }),
        });
        setNewSpeciesName("");
        fetchSpecies();
        } catch (err: any) {
        setError("Failed to add species: " + err.message);
        }
    };

  useEffect(() => {
    fetchSpecies();
  }, []);

  return (
    <div className="species-page">
      <h2>Manage Species</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading species...</p>
      ) : (
        <ul>
          {speciesList.map((species) => (
            <li key={species.id}>{species.name}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newSpeciesName}
          onChange={(e) => setNewSpeciesName(e.target.value)}
          placeholder="New species name"
        />
        <button type="submit">Add Species</button>
      </form>

      <button className="go-back-button" onClick={() => navigate("/admin-dashboard")}>
        Go Back
      </button>
    </div>
  );
}
