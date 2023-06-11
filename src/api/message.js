import axiosInstance from "../config/axiosInterceptor";
import API from "./api";

export const getMessageApi = (author, recipient, token) => {
  return axiosInstance.get(API + "/message", {
    params: {
      author: author,
      recipient: recipient,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const sendMessageApi = (data) => {
  const {body, author, recipient, token}=data
  return axiosInstance.post(
    API + "/message",
    { body, author, recipient },
    { headers: { Authorization: "Bearer " + token } }
  );
};
