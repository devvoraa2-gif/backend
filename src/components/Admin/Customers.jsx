import { useState, useEffect } from "react";
import Table from "./Table";
import apiClient from "../../services/apiClient.js";
import { useLoader } from "../../context/LoaderContext.jsx";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

const Customers = () => {
  const headers = ["ID", "Name", "Email", "Phone"];
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoader();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          `/api/v1/customer/paged?pageNumber=${page}&pageSize=${pageSize}`
        );

        const data = response.data ?? {};
        const items = data.Items ?? [];

        setRows(
          items.map((cust) => [cust.Id, cust.FullName, cust.Email, cust.Phone])
        );
        setTotalPages(data.TotalPages ?? 1);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page, pageSize, setLoading]);

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <Users className="text-blue-600" size={24} /> Customers
        </h2>
        <p className="text-gray-500 text-sm">
          Manage all your customers in one place
        </p>
      </div>

      {/* Table */}
      <Table headers={headers} rows={rows} />

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={18} /> Prev
        </button>

        <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Customers;
