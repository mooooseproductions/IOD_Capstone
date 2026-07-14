import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BARLEY_BREWING_PORTAL_API,
    withCredentials: true,
});

export const setApiAccessToken = (accessToken) => {
  if (accessToken) {
    api.defaults.headers.common.Authorization =
      `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;