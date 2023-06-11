import { useState } from "react";
import {
  createComment,
  deleteCommentApi,
  getCommentByPostId,
} from "../api/comment";
import axiosInstance from "../config/axiosInterceptor";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addComment, removeComment } from "../redux/slice/postSlice";

export const useComment = () => {
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);
  const [isLoadingRemoveComment, setIsLoadingRemoveComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const get = async (postId, token) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getCommentByPostId(postId, token);
      setIsLoading(false);
      setData([...response]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error);
    }
  };

  const add = async (body, author, post, token) => {
    try {
      setIsLoadingAddComment(true);
      const response = await createComment(body, author, post, token);
      setIsLoadingAddComment(false);
      dispatch(addComment(post));
      setData((value) => [...value, ...response]);
    } catch (error) {
      console.log(error);
      setIsLoadingAddComment(false);
    }
  };

  const deleteComment = async (id, token,postId) => {
    try {
      setIsLoadingRemoveComment(true);
      await deleteCommentApi(id, token);
      setIsLoadingRemoveComment(false);
      setData((value) => value.filter((v) => v._id !== id));
      dispatch(removeComment(postId));
    } catch (error) {
      console.log(error);
      setIsLoadingRemoveComment(false);
    }
  };

  return {
    isLoading,
    data,
    error,
    get,
    add,
    deleteComment,
    isLoadingRemoveComment,
    isLoadingAddComment,
  };
};
