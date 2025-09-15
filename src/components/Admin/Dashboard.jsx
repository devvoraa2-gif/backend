import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import Table from "./Table";
import apiClient from "../../services/apiClient.js";
import { DollarSign, Activity, Package } from "lucide-react";
import { useLoader } from "../../context/LoaderContext.jsx";

const Dashboard = () => {
  const { loading, setLoading } = useLoader(); // get global loader
  const [activeRows, setActiveRows] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [activeTab, setActiveTab] = useState("installations");

  const activeHeaders = ["ID", "Email", "Installation Date", "Status"];
  const paymentsHeaders = ["ID", "Customer", "Amount"];

  const paymentsRows = [
    ["1021", "John Smith", "$70"],
    ["1025", "John Smith", "$50"],
    ["1024", "John Smith", "$80"],
    ["1027", "John Smith", "$100"],
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const installationsRes = await apiClient.get(
          "/api/v1/subscription/active-installations?pageNumber=1&pageSize=50"
        );
        const items = installationsRes.data?.Data?.Items || [];

        const formatted = items.map((item) => [
          item.SubscriptionId,
          item.CustomerEmail,
          new Date(item.InstallDate).toLocaleDateString(),
          item.InstallStatus === 1 ? (
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">
              Active
            </span>
          ) : (
            <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm">
              Inactive
            </span>
          ),
        ]);
        setActiveRows(formatted);

        const activeCountRes = await apiClient.get(
          "/api/v1/subscription/active-installations-count"
        );
        setActiveCount(activeCountRes.data);

        const subscriptionCountRes = await apiClient.get(
          "/api/v1/subscription/count"
        );
        setSubscriptionCount(subscriptionCountRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard
          title="Active Installations"
          value={activeCount}
          icon={Activity}
          color="blue"
        />
        <DashboardCard
          title="Subscriptions"
          value={subscriptionCount}
          icon={Package}
          color="yellow"
        />
        <DashboardCard
          title="Payments"
          value="$12,750"
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab("installations")}
            className={`pb-2 font-medium ${
              activeTab === "installations"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Active Installations
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`pb-2 font-medium ${
              activeTab === "payments"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Recent Payments
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "installations" ? (
          <Table headers={activeHeaders} rows={activeRows} />
        ) : (
          <Table headers={paymentsHeaders} rows={paymentsRows} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
