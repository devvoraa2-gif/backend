import { useEffect, useState } from "react";
import {
  PlusCircle,
  Loader2,
  Star,
  Package,
  ClipboardList,
  CheckCircle,
  Trash,
} from "lucide-react";
import apiClient from "../../services/apiClient";
import Loader from "../Loader.jsx";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal.jsx";

const Packages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [creating, setCreating] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [form, setForm] = useState({
    Name: "",
    Description: "",
    Specs: "",
    UnitAmount: "",
    Currency: "usd",
    Interval: "month",
  });

  // Delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch Packages
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(
        "/api/v1/package/list?pageNumber=1&pageSize=50"
      );
      setPackages(data.Items || []);
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create Package
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setLoading(true);
    try {
      await apiClient.post("/api/v1/package/create", form);
      setForm({
        Name: "",
        Description: "",
        Specs: "",
        UnitAmount: "",
        Currency: "usd",
        Interval: "month",
      });
      fetchPackages();

      // Success state for button
      setCreatedSuccess(true);
      setTimeout(() => setCreatedSuccess(false), 2000);
    } catch (err) {
      console.error("Error creating package:", err);
    } finally {
      setCreating(false);
      setLoading(false);
    }
  };

  // Mark as Most Popular
  const makeMostPopular = async (id) => {
    setLoading(true);
    try {
      await apiClient.post(`/api/v1/package/make-most-popular?packageId=${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Error marking most popular:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Package
  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await apiClient.post("/api/v1/package/delete", deleteId, {
        headers: { "Content-Type": "application/json" },
      });
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package:", err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Package className="text-blue-600" size={26} /> Package Manager
      </h1>

      {/* Create Package Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 mb-10 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <PlusCircle className="text-green-600" size={20} /> Create New Package
        </h2>

        <input
          type="text"
          name="Name"
          placeholder="Package Name"
          value={form.Name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white"
          required
        />
        <input
          type="text"
          name="Description"
          placeholder="Description"
          value={form.Description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white"
          required
        />
        <input
          type="text"
          name="Specs"
          placeholder="Specifications"
          value={form.Specs}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white"
          required
        />
        <input
          type="number"
          name="UnitAmount"
          placeholder="Price (cents)"
          value={form.UnitAmount}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white"
          required
        />

        <div className="flex gap-4">
          <select
            name="Currency"
            value={form.Currency}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>

          <select
            name="Interval"
            value={form.Interval}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white"
          >
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={creating}
          className={`flex items-center justify-center w-full p-3 rounded-lg transition ${
            createdSuccess
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } disabled:opacity-70`}
        >
          {creating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : createdSuccess ? (
            <>
              <CheckCircle className="mr-2" /> Created!
            </>
          ) : (
            <>
              <PlusCircle className="mr-2" /> Create Package
            </>
          )}
        </button>
      </form>

      {/* Packages List */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <ClipboardList className="text-purple-600" size={22} /> Packages
      </h2>

      {loading ? (
        <Loader inline />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.Id}
              className="overflow-hidden bg-white p-6 rounded-xl shadow-md relative flex flex-col border border-gray-200"
            >
              {pkg.IsMostPopular && (
                <div className="absolute top-6 -right-7 rotate-45 bg-yellow-400 text-black text-xs font-bold px-6 py-1 shadow overflow-hidden">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-bold mb-2 text-gray-800">{pkg.Name}</h3>
              <p className="text-gray-600 text-sm">{pkg.Description}</p>
              <p className="mt-2 text-sm text-gray-500">{pkg.Specifications}</p>
              <p className="mt-3 font-semibold text-blue-600">
                ${(pkg.Price / 100).toFixed(2)}
              </p>

              <div className="mt-auto pt-4">
                {/* Most Popular button */}
                <button
                  onClick={() => makeMostPopular(pkg.Id)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                    pkg.IsMostPopular
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-yellow-400 text-black hover:bg-yellow-300"
                  }`}
                >
                  <Star
                    size={16}
                    className={pkg.IsMostPopular ? "fill-white" : ""}
                  />
                  {pkg.IsMostPopular ? "Most Popular" : "Mark as Most Popular"}
                </button>

                {/* Delete button */}
                <button
                  onClick={() => {
                    setDeleteId(pkg.Id);
                    setShowDeleteModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-lg border border-red-500 bg-white text-red-500 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition"
                >
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Packages;
