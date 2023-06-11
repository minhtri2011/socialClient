import axiosInstance from "../config/axiosInterceptor.js";
import API from "./api.js";

export const getPostsApi = (token) => {
  return axiosInstance.get(API + "/posts", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getPostsByUserIdApi = (id,token) => {
  return axiosInstance.get(API + "/posts/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const createPost = (data, token) => {
  return axiosInstance.post(API + "/posts", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const deletePost = (id, token) => {
  return axiosInstance.delete(API + "/posts/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const likePost = (id, userId, token) => {
  return axiosInstance.patch(
    API + "/posts/" + id + "/like",
    {
      userId: userId,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
