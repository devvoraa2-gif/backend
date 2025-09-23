import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-main">
        <Sidebar />
      </aside>

      <div className="md:hidden">
        <Sidebar mobile />
      </div>

      <main className="flex-1 bg-white p-4 md:p-6 overflow-x-auto md:ml-64">
        <Outlet />
      </main>
      
    </div>
  );
};

export default Admin;
