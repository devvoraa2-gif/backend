import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wifi } from "lucide-react";
import UserMenu from "./UserMenu";
import Sologan from "../../ui/Sologan";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/admin/customers", label: "Customers" },
    { to: "/admin/dashboard", label: "Active Installations" },
    { to: "/admin/packages", label: "Packages" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-blue-900 text-white flex items-center justify-between p-3">
        <Sologan />
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-blue-900 text-white p-4 space-y-4">
        <Sologan />
        <hr className="text-gray-400" />

        {/* Links */}
        <div className="mt-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `p-3 rounded hover:bg-blue-700 block ${isActive ? "bg-blue-700 font-semibold" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <UserMenu sidebar />
        </div>
      </div>

      {/* Mobile Sidebar + Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-blue-900 text-white z-50 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex justify-between items-center p-4 border-b border-blue-700">
                <Sologan />
                <UserMenu sidebar />
                <button onClick={() => setOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 p-4 space-y-2">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `p-3 rounded hover:bg-blue-700 block ${isActive ? "bg-blue-700 font-semibold" : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
