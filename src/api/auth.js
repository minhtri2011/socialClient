import axiosInstance from "../config/axiosInterceptor.js";
import API from "./api.js";

//register
export const register = (data) => {
  return axiosInstance.post(API + "/auth/register", data);
};
export const login = (data) => {
  return axiosInstance.post(API + "/auth/login", data);
};
