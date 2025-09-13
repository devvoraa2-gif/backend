import axios from "axios";
import BASE_URL from "../../api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor (attach access token)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Response Interceptor (handle expired token)
apiClient.interceptors.response.use(
  (response) => response, // If successful, just return the response
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite loop

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // No refresh token? → logout user
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // redirect
          return Promise.reject(error);
        }

        // Call refresh endpoint
        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
          refreshToken,
        });

        if (data?.Success) {
          // Save new tokens
          localStorage.setItem("accessToken", data.Data.AccessToken);
          localStorage.setItem("refreshToken", data.Data.RefreshToken);

          // Update header & retry original request
          originalRequest.headers.Authorization = `Bearer ${data.Data.AccessToken}`;
          return apiClient(originalRequest);
        } else {
          // Refresh failed → force logout
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } catch (err) {
        // Refresh request itself failed → logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


// What happens here

// Every request → adds Authorization: Bearer <accessToken>.

// If response is 401 Unauthorized:

// Try /api/v1/auth/refresh with the refresh token.

// If success → save new tokens, retry original request.

// If fail → clear tokens & redirect to /login.


export default apiClient;
