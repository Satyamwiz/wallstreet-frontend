import axios from "axios";

const API_URL = import.meta.env.VITE_LOCAL_BACKEND;

const axiosNoAuthInstance = axios.create({
    baseURL: API_URL,
});

const axiosAuthInstance = axios.create({
    baseURL: API_URL,
});

axiosAuthInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Token ${import.meta.env.VITE_BEARER_TOKEN}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export {axiosAuthInstance, axiosNoAuthInstance};
