import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUtil } from "../../../utils/apiUtil";
import Adoption from "./components/Adoption";
import "./AdminAdoptionsPage.css";

type Adoption = {
  id: string;
  userEmail: string;
  petName: string;
  status: "PENDING" | "ACCEPTED";
  adoptionTimestamp: string;
};

type AdoptionResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  elements: Adoption[];
};

export default function AdminAdoptionsPage() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const fetchAdoptions = async () => {
    try {
      const data: AdoptionResponse = await apiUtil("http://localhost:8777/api/v1/adoptions");
      setAdoptions(data.elements);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      const adoption = adoptions.find((a) => a.id === id);
      if (!adoption) return;

      await apiUtil(`http://localhost:8777/api/v1/adoptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: adoption.userEmail,
          petName: adoption.petName,
        }),
      });

      await fetchAdoptions();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReject = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to reject this adoption request?");
    if (!confirm) return;

    try {
      await apiUtil(`http://localhost:8777/api/v1/adoptions/${id}`, {
        method: "DELETE",
      });

      fetchAdoptions();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-adoptions-page">
      <h2>Adoption Requests</h2>

      <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
        Back to Dashboard
      </button>

      {error && <div className="error">{error}</div>}

      <div className="adoptions-list">
        {adoptions.length === 0 ? (
          <p>No adoption requests found.</p>
        ) : (
          adoptions.map((adoption) => (
            <Adoption
              key={adoption.id}
              adoption={adoption}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}
