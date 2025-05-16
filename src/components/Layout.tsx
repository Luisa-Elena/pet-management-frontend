import React from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom"; 

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
