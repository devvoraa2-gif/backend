import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Customers from "./components/Admin/Customers";
import Dashboard from "./components/Admin/Dashboard";
import Packages from "./components/Admin/Packages";
import Signup from "./components/Auth/Signup/Signup";
import Signin from "./components/Auth/Signin/Signin";
import ConfirmEmail from "./components/Auth/ConfirmEmail";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import { LoaderProvider } from "./context/LoaderContext";
import Calender from './components/Calender/Calender.jsx'


function App() {
  return (
    <LoaderProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />   


        {/* Admin protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="packages" element={<Packages />} />
          <Route path="book-date/:paymentId" element={<Calender />} />
        </Route>

      </Routes>
    </LoaderProvider>

  );
}

export default App;
