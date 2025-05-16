import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUtil } from "../../../../utils/apiUtil";
import "./AddPetForm.css";

const CLOUD_NAME = "dpchovljs";
const UPLOAD_PRESET = "pet-upload";

type NewPet = {
  name: string;
  description: string;
  speciesName: string;
  imageUrl: string;
};

export default function UpdatePetForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<NewPet>({
    name: "",
    description: "",
    speciesName: "",
    imageUrl: "",
  });

  const [speciesOptions, setSpeciesOptions] = useState<{ id: string; name: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl; // Default to existing image

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("upload_preset", UPLOAD_PRESET);
        uploadData.append("cloud_name", CLOUD_NAME);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: uploadData,
        });

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      await apiUtil(`http://localhost:8777/api/v1/pets/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...formData, imageUrl }),
      });

      setMessage("Pet updated successfully!");
      setImageFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await apiUtil(`http://localhost:8777/api/v1/pets/${id}`);
        setFormData({
          name: data.name,
          description: data.description,
          speciesName: data.speciesName,
          imageUrl: data.imageUrl,
        });
      } catch (err: any) {
        setError("Error loading pet data.");
      }
    };

    const fetchSpecies = async () => {
      try {
        const data = await apiUtil("http://localhost:8777/api/v1/species", {
          method: "GET",
        });
        setSpeciesOptions(data);
      } catch (err) {
        console.error("Error fetching species:", err);
      }
    };

    fetchPet();
    fetchSpecies();
  }, [id]);

  return (
    <div className="add-pet-container">
      <h2>Update Pet</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading...</div>}

      <form onSubmit={handleSubmit} className="add-pet-form">
        <input
          type="text"
          name="name"
          placeholder="Pet name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select
          name="speciesName"
          value={formData.speciesName}
          onChange={handleChange}
          required
        >
          <option value="">Select a species</option>
          {speciesOptions.map((species) => (
            <option key={species.id} value={species.name}>
              {species.name}
            </option>
          ))}
        </select>

        {formData.imageUrl && (
          <div className="image-preview">
            <p>Current Image:</p>
            <img
              src={formData.imageUrl}
              alt="Current Pet"
              style={{ width: "150px", height: "auto", marginBottom: "1rem" }}
            />
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Updating Pet..." : "Update Pet"}
        </button>
        <button type="button" onClick={() => navigate("/admin/pets")}>
          Go Back
        </button>
      </form>
    </div>
  );
}
