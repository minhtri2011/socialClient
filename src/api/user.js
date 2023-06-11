import axiosInstance from "../config/axiosInterceptor.js";
import API from "./api.js";

export const getFriendByUserId = (id, token) => {
  return axiosInstance.get(`${API}/user/${id}/friends`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const addRemoveFriendByUserId = (id, friendId, token) => {
  return axiosInstance.patch(
    `${API}/user/${id}/${friendId}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getUserById = (id, token) => {
  return axiosInstance.get(
    `${API}/user/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
