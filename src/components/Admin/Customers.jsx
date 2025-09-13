import { useState, useEffect } from "react";
import Table from "./Table";
import apiClient from "../../services/apiClient.js";

const Customers = () => {
  const headers = ["ID", "Name", "Email", "Phone"];
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);



  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get(
          `/api/v1/customer/paged?pageNumber=${page}&pageSize=${pageSize}`
        );

        console.log("API Response:", response.data);

        // Some APIs wrap in .data, others return flat JSON
        const data = response.data ?? {};
        const items = data.Items ?? [];

        setRows(
          items.map((cust) => [cust.Id, cust.FullName, cust.Email, cust.Phone])
        );
        setTotalPages(data.TotalPages ?? 1);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [page, pageSize]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      <Table headers={headers} rows={rows} />

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 bg-white border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;
