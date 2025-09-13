import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient.js";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/v1/auth/reset-password", {
        Email: email,
        NewPassword: newPassword,
        Token: token,
      });

      setMessage(res.data.Message || "Password reset successfully.");

      if (res.data.Success) {
        navigate("/login");
      }
    } catch (err) {
      setMessage(err.response?.data?.Message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border border-white bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-3 rounded-lg border border-white bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter the reset token"
            className="w-full p-3 rounded-lg border border-white bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Reset Password
          </button>

          <div className="text-right">
            <Link
              to="/login"
              className="text-sm text-white hover:underline"
            >
              Login ?
            </Link>
          </div>
        </form>

        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>

  );
};

export default ResetPassword;
