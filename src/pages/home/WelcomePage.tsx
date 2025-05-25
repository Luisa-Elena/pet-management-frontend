import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to FurEver Home!</h1>
      <p className="welcome-text">
        "Because every tail deserves a tale."
      </p>
      <div>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
