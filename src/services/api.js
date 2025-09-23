import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL/api,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      !error.config.url.includes("/auth/refresh-token")
    ) {
      error.config._retry = true;
      try {
        await api.post("/auth/refresh-token");
        return api(error.config);
      } catch (refreshError) {
        // Optionally: dispatch to Redux if needed
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
