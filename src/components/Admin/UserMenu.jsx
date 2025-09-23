import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-0 py-4">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 bg-main text-white px-1 py-2 rounded-full hover:bg-secondary"
      >
        <User className="h-5 w-5" />
        <span>{user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[-60%] mt-2 w-48 bg-white rounded-lg shadow border p-1">
          {/* <button
            onClick={() => navigate("/admin")}
            className="flex items-center w-full px-3 py-2 text-left rounded hover:bg-gray-100"
          >
            <User className="h-4 w-4 mr-2 text-blue-600" />
            Profile
          </button> */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-left rounded hover:bg-gray-100 text-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
