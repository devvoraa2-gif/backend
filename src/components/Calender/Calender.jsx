import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../../services/apiClient.js";
import { useNavigate, useParams } from "react-router-dom";

const FutureDatePicker = () => {
    const { paymentId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: string }
  const navigate = useNavigate();

  const subscriptionId = paymentId;
 
  const handleChange = (date) => {
    if (date) {
      const isoDate = date.toISOString();
      setSelectedDate(isoDate);
      setIsUpdated(false);
      setMessage(null); // clear old messages
    }
  };

  const updateDate = async () => {
    if (!selectedDate) {
      setMessage({ type: "error", text: "Please select a date first." });
      return;
    }
    try {
      setLoadingUpdate(true);
      const res = await apiClient.post(
        `/api/v1/subscription/update-install-date?subscriptionId=${subscriptionId}&installDate=${selectedDate}`
      );
      console.log(res.data);
      setIsUpdated(true);
      setMessage({ type: "success", text: "Date updated successfully!" });
    } catch (err) {
      console.error("Error updating date:", err);
      setMessage({ type: "error", text: "Failed to update date." });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const sendDate = async () => {
    try {
      setLoadingSend(true);
      const res = await apiClient.post(
        `/api/v1/subscription/send-install-date?subscriptionId=${subscriptionId}`
      );
      console.log(res.data);
      setMessage({ type: "success", text: "Install date sent successfully!" });
    } catch (err) {
      console.error("Error sending install date:", err);
      setMessage({ type: "error", text: "Failed to send install date." });
    } finally {
      navigate(`/admin/dashboard`)
      setLoadingSend(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-20 bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Book Installation Date
      </h2>
      <h3 className="text-xl font-bold text-gray-800 text-center">
        client with subscription-id {subscriptionId}
      </h3>

      {/* Date Picker */}
      <div className="flex items-center justify-center">
        <DatePicker
          selected={selectedDate ? new Date(selectedDate) : null}
          onChange={handleChange}
          minDate={new Date()}
          showTimeSelect
          dateFormat="Pp"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholderText="Select a future date"
        />
      </div>

      {/* Feedback message */}
      {message && (
        <div
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={updateDate}
          disabled={loadingUpdate}
          className={`w-1/2 px-4 py-2 rounded-lg font-medium flex items-center justify-center transition ${
            loadingUpdate
              ? "bg-blue-400 cursor-not-allowed text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loadingUpdate && (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
          )}
          {loadingUpdate ? "Updating..." : "Update Date"}
        </button>

        <button
          onClick={sendDate}
          disabled={!isUpdated || loadingSend}
          className={`w-1/2 px-4 py-2 rounded-lg font-medium flex items-center justify-center transition ${
            !isUpdated || loadingSend
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {loadingSend && (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
          )}
          {loadingSend ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default FutureDatePicker;
