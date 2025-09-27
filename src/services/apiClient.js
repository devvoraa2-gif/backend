import axios from "axios";
import BASE_URL from "../../api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh-access-token`,
          {},
          { withCredentials: true }
        );

        if (data?.Success) {
          localStorage.setItem("accessToken", data.Data);

          originalRequest.headers.Authorization = `Bearer ${data.Data}`;
          return apiClient(originalRequest);
        } else {
          localStorage.removeItem("accessToken");
          console.log("Token Removed")
          window.location.href = "/login";
        }
      } catch (err) {
        console.log("Token Removed")
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default apiClient;

// the approach for now  :
// AccessToken → localStorage (short-lived).
// RefreshToken → cookie (HttpOnly, auto-sent).
// Refresh flow → interceptor retries automatically.