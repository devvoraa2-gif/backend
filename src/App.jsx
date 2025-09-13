import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Customers from "./components/Admin/Customers";
import Dashboard from "./components/Admin/Dashboard";
import Payments from "./components/Admin/Payments";
import Packages from "./components/Admin/Packages";
import Signup from "./components/Auth/Signup/Signup";
import Signin from "./components/Auth/Signin/Signin";
import ConfirmEmail from "./components/Auth/ConfirmEmail";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> {/* 🔹 new */}
      <Route path="/reset-password" element={<ResetPassword />} />   {/* 🔹 new */}
      {/* Admin protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<Customers />} />
        <Route path="customers" element={<Customers />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="payments" element={<Payments />} />
        <Route path="packages" element={<Packages />} />
      </Route>
    </Routes>
  );
}

export default App;
