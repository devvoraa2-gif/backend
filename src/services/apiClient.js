import axios from "axios";
import BASE_URL from "../../api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Add token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default apiClient;
