import axios from "axios";

const VITE_API_URL: string = "http://sports.local:8088/api/" // Adjust if needed

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
