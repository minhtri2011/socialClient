import axiosInstance from "../config/axiosInterceptor";
import API from "./api";

export const getAllConversations = (id, token) => {
  return axiosInstance.get(API + "/conversation/all/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const createConversation = (data, token) => {
  return axiosInstance.post(
    API + "/conversation",
    {members:data},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
