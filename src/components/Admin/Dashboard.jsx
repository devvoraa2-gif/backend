import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import Table from "./Table";
import apiClient from "../../services/apiClient.js";
import { DollarSign, Activity, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader.jsx";

const Dashboard = () => {

  // loader states 
  const [loadingActive, setLoadingActive] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);


  const navigate = useNavigate();

  const [activeRows, setActiveRows] = useState([]);
  const [paymentRows, setPaymentRows] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);

  const [activeTab, setActiveTab] = useState("installations");

  // Pagination state for active installations
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 15;


  // Pagination state for payments
  const [paymentPageNumber, setPaymentPageNumber] = useState(1);
  const [paymentTotalPages, setPaymentTotalPages] = useState(1);
  const paymentPageSize = 15;



  const activeHeaders = ["ID", "Email", "Installation Date", "Status", "Book data"];
  const paymentsHeaders = ["ID", "Invoice Link", "Amount", "Date"];


  //  Fetch Installations Status
  const updateInstallStatus = async (subscriptionId, status) => {
    try {
      const res = await apiClient.post(
        `/api/v1/subscription/update-install-state?subscriptionId=${subscriptionId}&status=${status}`
      );

      if (res.data?.Success) {
        // refresh table after update
        fetchActiveInstallations(pageNumber);
      } else {
        console.error("Failed to update status:", res.data?.Message);
      }
    } catch (err) {
      console.error("Error updating install status:", err);
    }
  };



  // Fetch Active Installations
  const fetchActiveInstallations = async (page) => {
    setLoadingActive(true);
    try {
      const res = await apiClient.get(
        `/api/v1/subscription/installations?pageNumber=${page}&pageSize=${pageSize}`
      );
      const items = res.data?.Data?.Items || [];
      setTotalPages(res.data?.Data?.TotalPages || 1);

      const formattedActive = items.map((item, index) => [
        item.SubscriptionId,
        item.CustomerEmail,
        item.InstallDate
          ? new Date(item.InstallDate).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          : "Not Specified",

        item.InstallStatus === 1 ? (
          <button
            onClick={() => {
              updateInstallStatus(item.SubscriptionId, 0);

            }}
            className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm cursor-pointer">
            Completed
          </button>
        ) : (
          <button
            onClick={() => updateInstallStatus(item.SubscriptionId, 1)}
            className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm cursor-pointer">
            Non Completed
          </button>
        ),


        item.InstallDate ?
          <div className="flex gap-4">
            <button
              className="disable px-3 py-1 text-sm bg-green-700 text-white rounded"
            >
              Booked
            </button>

            <button
              onClick={() => navigate(`/admin/book-date/${item.SubscriptionId}`)}
              className="cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update
            </button>

          </div>

          :
          <button
            onClick={() => navigate(`/admin/book-date/${item.SubscriptionId}`)}
            className="cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Book installation data
          </button>
      ]);

      setActiveRows(formattedActive);
    } catch (err) {
      console.error("Failed to fetch active installations", err);
    } finally {
      setLoadingActive(false);
    }
  };


  const fetchPayments = async (page) => {
    setLoadingPayments(true);
    try {
      const res = await apiClient.get(
        `/api/v1/payment/recent-payments?pageNumber=${page}&pageSize=${paymentPageSize}`
      );
      const items = res.data?.Items || [];
      setPaymentTotalPages(res.data?.TotalPages || 1);

      const formattedPayments = items.map((p) => [
        p.PaymentId,
        p.InvoiceUrl ? (
          <a
            href={p.InvoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
              View Invoice Link
            </button>
          </a>
        ) : (
          <button className="px-3 py-1 bg-red-800 text-white rounded">
            Link Not Provided
          </button>
        ),
        `$${p.PaymentAmount.toFixed(2)}`,
        new Date(p.CreatedAt).toLocaleString(),
      ]);
      setPaymentRows(formattedPayments);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    } finally {
      setLoadingPayments(false);
    }
  };


  // Fetch stats once on mount
  useEffect(() => {
    const fetchOtherStats = async () => {
      try {
        const [subscriptionCountRes, paymentsCountRes] =
          await Promise.all([
            // apiClient.get("/api/v1/subscription/active-installations-count"),
            apiClient.get("/api/v1/subscription/count"),
            apiClient.get("/api/v1/payment/total-payments"),
          ]);

        // setActiveCount(activeCountRes.data);
        setSubscriptionCount(subscriptionCountRes.data);
        setPaymentCount(paymentsCountRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchOtherStats();
  }, []);


  useEffect(()=>{
    const fetchNonCompletedCount = async () => {
      try{
        const res = await apiClient.get("/api/v1/subscription/active-installations-count");
        setActiveCount(res.data);
      }catch{
        console.error("Failed to fetch non completed installations count")
      }
    } 
    fetchNonCompletedCount();
  },[updateInstallStatus])

  
  // Fetch paginated active installations
  useEffect(() => {
    fetchActiveInstallations(pageNumber);
  }, [pageNumber]);

  // Fetch paginated payments
  useEffect(() => {
    fetchPayments(paymentPageNumber);
  }, [paymentPageNumber]);




  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard title="Non completed Installations" value={activeCount} icon={Activity} color="blue" />
        <DashboardCard title="Subscriptions" value={subscriptionCount} icon={Package} color="yellow" />
        <DashboardCard
          title="Payments"
          value={`$ ${new Intl.NumberFormat("en-US").format(paymentCount)}`}
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab("installations")}
            className={`pb-2 font-medium ${activeTab === "installations"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Active Installations
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`pb-2 font-medium ${activeTab === "payments"
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
        {activeTab === "installations" && (
          <div>
            {loadingActive ?
              <Loader inline /> :
              <>
                <Table headers={activeHeaders} rows={activeRows} />

                {/* Installations Pagination */}
                <div className="flex items-center justify-center gap-12 mt-4">
                  <button
                    onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                    disabled={pageNumber === 1}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {pageNumber} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
                    disabled={pageNumber === totalPages}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </>

            }

          </div>
        )}

        {activeTab === "payments" && (
          <div>
            {loadingPayments ?
              <Loader inline /> :
              <>
                <Table headers={paymentsHeaders} rows={paymentRows} />
                {/* Payments Pagination */}
                <div className="flex items-center justify-center gap-12 mt-4">
                  <button
                    onClick={() =>
                      setPaymentPageNumber((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={paymentPageNumber === 1}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {paymentPageNumber} of {paymentTotalPages}
                  </span>

                  <button
                    onClick={() =>
                      setPaymentPageNumber((prev) =>
                        Math.min(prev + 1, paymentTotalPages)
                      )
                    }
                    disabled={paymentPageNumber === paymentTotalPages}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </>
            }

          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
