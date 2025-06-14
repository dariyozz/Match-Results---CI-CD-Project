import axios from "axios";

const VITE_API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:8080/api"; // Adjust if needed

const api = axios.create({
    baseURL: VITE_API_URL, // Adjust if needed
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
