import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BARLEY_BREWING_PORTAL_API,
    withCredentials: true,
});

const storedAccessToken =
  localStorage.getItem("accessToken");

if (storedAccessToken) {
  api.defaults.headers.common.Authorization =
    `Bearer ${storedAccessToken}`;
}

export const setApiAccessToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);

    api.defaults.headers.common.Authorization =
      `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");

    delete api.defaults.headers.common.Authorization;
  }
};

export default api;