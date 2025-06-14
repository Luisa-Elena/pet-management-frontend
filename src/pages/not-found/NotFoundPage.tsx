import React from "react";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="go-home-link">Go back to Home</a>
    </div>
  );
}
