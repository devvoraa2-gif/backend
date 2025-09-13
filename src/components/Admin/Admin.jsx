import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

const Admin = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white p-4 md:p-6 overflow-x-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Admin Panel</h1>
          <UserMenu />
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Admin;

