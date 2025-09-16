import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Loader2, Wifi } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../services/apiClient";

const Signin = () => {
  const [form, setForm] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await apiClient.post("/api/v1/auth/login", form);

      if (data.Success) {
        // save tokens in localStorage
        localStorage.setItem("accessToken", data.Data.AccessToken);
        localStorage.setItem("refreshToken", data.Data.RefreshToken);

        // redirect to admin
        navigate("/admin");
      } else {
        setError(data.Message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.Message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500"
    >
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30">

        <div className="flex flex-col items-center text-center mb-6">
          {/* Icon + Company Name */}
          <div className="flex items-center gap-2">
            <Wifi
              size={32}
              className="text-white transform -rotate-45 transition-colors duration-300 hover:text-[#D9F266]"
            />
            <span className="text-2xl font-bold text-white">Elite UK</span>
          </div>

          {/* Welcome Sentence */}
          <p className="mt-2 text-white/80 text-sm">
            Welcome back, sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={form.Email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={form.Password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Forgot password link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-white opacity-90 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} className="mr-2" /> Sign In
              </>
            )}
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

        <p className="text-sm text-gray-800 mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white opacity-80 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signin;
