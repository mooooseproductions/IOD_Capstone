import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BARLEY_BREWING_PORTAL_API,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_BARLEY_BREWING_PORTAL_API,
  withCredentials: true,
});

const storedAccessToken = localStorage.getItem("accessToken");

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

let refreshPromise = null;

const refreshAccessToken = async () => {

  if (!refreshPromise) {
    refreshPromise = refreshApi
      .post("/auth/refresh-token")
      .then((response) => {
        const newAccessToken =
          response.data.data.accessToken;

        setApiAccessToken(newAccessToken);

        return newAccessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;