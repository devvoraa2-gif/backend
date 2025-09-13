import DashboardCard from "./DashboardCard";
import Table from "./Table";

const Dashboard = () => {
  const activeHeaders = ["ID", "Email", "Installation Date", "Status"];
  const activeRows = [
    ["1021", "John2@example.com", "July 27, 2023", <span className="bg-green-200 px-2 py-1 rounded">Pending</span>],
    ["1025", "John2@example.com", "July 27, 2023", <span className="bg-green-200 px-2 py-1 rounded">Pending</span>],
    ["1024", "John2@example.com", "July 27, 2023", <span className="bg-green-200 px-2 py-1 rounded">Pending</span>],
    ["1027", "John2@example.com", "July 27, 2023", <span className="bg-green-200 px-2 py-1 rounded">Pending</span>],
  ];

  const paymentsHeaders = ["ID", "Customer", "Amount"];
  const paymentsRows = [
    ["1021", "John Smith", "$70"],
    ["1025", "John Smith", "$50"],
    ["1024", "John Smith", "$80"],
    ["1027", "John Smith", "$100"],
  ];

  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold mb-4">Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard title="Active installation" value="24" />
        <DashboardCard title="Payments" value="$12,750" />
        <DashboardCard title="Subscriptions" value="15,48" />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">Active Installations</h3>
          <Table headers={activeHeaders} rows={activeRows} />
        </div>
        <div>
          <h3 className="font-bold mb-2">Recent Payments</h3>
          <Table headers={paymentsHeaders} rows={paymentsRows} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
