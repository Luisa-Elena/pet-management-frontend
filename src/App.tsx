import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import UserDashboard from "./pages/user/dashboard/UserDashboard";
import { AuthProvider } from "./context/AuthContext";
import RequireRole from "./components/RequireRole";
import WelcomePage from "./pages/home/WelcomePage";
import ForbiddenPage from "./pages/forbidden/ForbiddenPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import About from "./components/about/About";
import Layout from "./components/Layout";
import PetAdminPage from "./pages/admin/pets/PetAdminPage";
import AddPetForm from "./pages/admin/pets/forms/AddPetForm";
import UpdatePetForm from "./pages/admin/pets/forms/UpdatePetForm";
import SpeciesPage from "./pages/admin/species/SpeciesPage";
import PetUserPage from "./pages/user/pets/PetUserPage";
import AdminAdoptionsPage from "./pages/admin/adoptions/AdminAdoptionsPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/admin-dashboard"
              element={
                <RequireRole role="ADMIN">
                  <AdminDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/admin/pets"
              element={
                <RequireRole role="ADMIN">
                  <PetAdminPage />
                </RequireRole>
              }
            />
            <Route
              path="/admin/pets/add"
              element={
                <RequireRole role="ADMIN">
                  <AddPetForm />
                </RequireRole>
              }
            />
            <Route
              path="/admin/pets/update/:id"
              element={
                <RequireRole role="ADMIN">
                  <UpdatePetForm />
                </RequireRole>
              }
            />
            <Route
              path="/admin/species"
              element={
                <RequireRole role="ADMIN">
                  <SpeciesPage />
                </RequireRole>
              }
            />
            <Route
              path="/admin/adoptions"
              element={
                <RequireRole role="ADMIN">
                  <AdminAdoptionsPage />
                </RequireRole>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <RequireRole role="USER">
                  <UserDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/user/pets"
              element={
                <RequireRole role="USER">
                  <PetUserPage />
                </RequireRole>
              }
            />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
