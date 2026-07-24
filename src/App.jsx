import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage"
import DashboardPage from "./pages/dashboard/DashboardPage";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { PlantsListPage } from "@/pages/plantas/PlantsListPage";
import { PlantFormPage } from "@/pages/plantas/PlantFormPage";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="plantas" element={<PlantsListPage />} />
          <Route path="plantas/nueva" element={<PlantFormPage mode="create" />} />
          <Route path="plantas/:id/editar" element={<PlantFormPage mode="edit" />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
