import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/apiClient.js";
import { CheckCircle2, XCircle, Mail } from "lucide-react";

const ConfirmEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // email from register page

  const [token, setToken] = useState("");
  const [status, setStatus] = useState(null); // null | success | error

  const handleConfirm = async () => {
    if (!token || !email) return;

    try {
      const { data } = await apiClient.get(
     `/api/v1/auth/confirm-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
      );
      if (data.Success == true) {
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center w-full">
        <div className="flex justify-center mb-4">
          <Mail className="w-10 h-10 text-blue-600" />
        </div>

        <h2 className="text-xl font-bold mb-4">Confirm Your Email</h2>
        <p className="text-gray-600 mb-2">
          We’ve sent a confirmation link to <b>{email}</b>.  
          Please paste the token you received in your inbox:
        </p>

        <input
          type="text"
          placeholder="Enter your token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
        >
          Confirm Email
        </button>

        {status === "success" && (
          <div className="flex items-center justify-center text-green-600 mt-3 gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <p>Email confirmed! Redirecting to login...</p>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center justify-center text-red-600 mt-3 gap-2">
            <XCircle className="w-5 h-5" />
            <p>Invalid or expired token. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
