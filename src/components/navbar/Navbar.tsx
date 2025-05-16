import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { setUserInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookie (client-side attempt; actual logout should hit logout API)
    document.cookie = "jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    setUserInfo(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}
