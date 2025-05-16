import { Link } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Welcome Admin</h1>

      <div className="admin-grid">
        <Link to="/admin/pets" className="admin-button bg-blue">
          Manage Pets
        </Link>
        <Link to="/admin/species" className="admin-button bg-green">
          Manage Species
        </Link>
        <Link to="/admin/adoptions" className="admin-button bg-purple">
          Manage Adoptions
        </Link>
      </div>
    </div>
  );
}
