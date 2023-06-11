import axiosInstance from "../config/axiosInterceptor";
import API from "./api";

export const getCommentByPostId = (postId, token) => {
  return axiosInstance.get(API + "/comments/" + postId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const createComment = (body, author, post, token) => {
  return axiosInstance.post(
    API + "/comments",
    {
      body,
      author,
      post,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteCommentApi = (id, token) => {
  return axiosInstance.delete(API + "/comments/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
