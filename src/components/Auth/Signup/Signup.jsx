import { motion } from "framer-motion";
import { UserPlus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import apiClient from "../../../services/apiClient.js";

const Signup = () => {
  const [apiErr, setApiErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    FirstName: Yup.string()
      .required("First name is required")
      .min(3, "At least 3 characters"),

    LastName: Yup.string()
      .required("Last name is required")
      .min(3, "At least 3 characters"),

    UserName: Yup.string()
      .required("Username is required")
      .min(3, "At least 3 characters"),

    Email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),

    Phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^01[0-9]{9}$/,
        "Phone number must start with 01 and be 11 digits long"
      ),

    Password: Yup.string()
      .required("Password is required")
      .min(8, "At least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&#]/, "Must contain at least one special character"),

    ConfirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("Password"), null], "Passwords must match"),
  });

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        FirstName: "",
        LastName: "",
        UserName: "",
        Email: "",
        Phone: "",
        Password: "",
        ConfirmPassword: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        setApiErr("");
        setIsLoading(true);
        try {
          const { data } = await apiClient.post(
            "/api/v1/auth/register",
            values
          );

          if (data.Success === true) {
            navigate("/confirm-email", { state: { email: values.Email } });
          }
        } catch (err) {
          const apiResponse = err.response?.data;
          if (apiResponse?.Errors && Array.isArray(apiResponse.Errors)) {
            setApiErr(apiResponse.Errors);
          } else {
            setApiErr(apiResponse?.Message || "Registration failed");
          }
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500"
    >
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={values.FirstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.FirstName && errors.FirstName && (
              <p className="text-red-800 text-sm">{errors.FirstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={values.LastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.LastName && errors.LastName && (
              <p className="text-red-800 text-sm">{errors.LastName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              name="UserName"
              placeholder="Username"
              value={values.UserName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.UserName && errors.UserName && (
              <p className="text-red-800 text-sm">{errors.UserName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="Email"
              placeholder="Email Address"
              value={values.Email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.Email && errors.Email && (
              <p className="text-red-800 text-sm">{errors.Email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="Phone"
              placeholder="Phone Number"
              value={values.Phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.Phone && errors.Phone && (
              <p className="text-red-800 text-sm">{errors.Phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={values.Password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.Password && errors.Password && (
              <p className="text-red-800 text-sm">{errors.Password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              value={values.ConfirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-white rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {touched.ConfirmPassword && errors.ConfirmPassword && (
              <p className="text-red-800 text-sm">{errors.ConfirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Up...
              </>
            ) : (
              <>
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </>
            )}
          </button>
        </form>

        {apiErr.length > 0 && (
          <ul className="my-4 list-disc list-inside text-red-600 text-sm space-y-1">
            {apiErr.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        <p className="text-sm text-gray-800 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white opacity-80 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
