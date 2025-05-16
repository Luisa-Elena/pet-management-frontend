import React from "react";
import "./ForbiddenPage.css";

export default function ForbiddenPage() {
  return (
    <div className="forbidden-container">
      <h1 className="forbidden-title">403 - Forbidden</h1>
      <p className="forbidden-message">You don’t have permission to access this page.</p>
      <a href="/" className="go-home-link">Go back to Home</a>
    </div>
  );
}
