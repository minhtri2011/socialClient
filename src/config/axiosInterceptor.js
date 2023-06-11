import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const errorMessage = error.response.data.message;
    return Promise.reject(errorMessage);
  }
);
export default axiosInstance;
