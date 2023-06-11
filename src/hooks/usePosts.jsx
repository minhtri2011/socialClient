import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, likePost } from "../api/post";
import {
  addPost,
  getPosts,
  getPostsByUserId,
  likePostAction,
  removePost,
} from "../redux/slice/postSlice";

export const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  const get = (token) => {
    try {
      dispatch(getPosts(token)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const getByUserId = (id,token) => {
    try {
      dispatch(getPostsByUserId({id,token})).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const add = async (data, token) => {
    try {
      const response = await createPost(data, token);
      dispatch(addPost(response));
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (id, token) => {
    try {
      await deletePost(id, token);
      dispatch(removePost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const like = async (id, userId, token) => {
    try {
      await likePost(id, userId, token);
      dispatch(likePostAction({ id, userId }));
    } catch (error) {
      console.log(error);
    }
  };

  return { like, posts, isLoading, error, get, add, remove,getByUserId };
};
