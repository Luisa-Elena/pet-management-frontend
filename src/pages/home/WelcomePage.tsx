import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to Our App!</h1>
      <p className="welcome-text">
        We're glad to have you here.
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
