import axios from "axios";
import { store } from "../store/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_BARLEY_BREWING_PORTAL_API,
    // withCredentials: true // flag
});

// api.interceptors.request.use((config) => {
//     const accessToken = store.getState().auth.accessToken;

//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
// });

export default api;