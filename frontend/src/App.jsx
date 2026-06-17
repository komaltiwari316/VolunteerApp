import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleSelect from "./pages/RoleSelect";
import AdminRegister from "./pages/auth/AdminRegister";
import VolunteerRegister from "./pages/auth/VolunteerRegister";
import AdminLogin from "./pages/auth/AdminLogin";
import VolunteerLogin from "./pages/auth/VolunteerLogin";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import VolunteerDashboard from "./pages/dashboard/VolunteerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelect />} />

        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/volunteer-register" element={<VolunteerRegister />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/volunteer-login" element={<VolunteerLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer-dashboard"
          element={
            <ProtectedRoute role="volunteer">
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
