import { Link } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  return (
    <div className="user-container">
      <h1 className="user-title">Welcome User</h1>

      <div className="user-grid">
        <Link to="/user/pets" className="user-button bg-blue">
          View Available Pets
        </Link>
      </div>
    </div>
  );
}
