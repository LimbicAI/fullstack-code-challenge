import axios from "axios";

export const baseURL = import.meta.env.VITE_BE_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

(axiosInstance as any).origin = axios;

export default axiosInstance;
