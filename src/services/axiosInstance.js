import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL; 
console.log(API_URL, import.meta.env.VITE_BACKEND_URL);

const axiosNoAuthInstance = axios.create({
  baseURL: API_URL,
});

const axiosAuthInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor for the authenticated axios instance.
axiosAuthInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosAuthInstance, axiosNoAuthInstance };
