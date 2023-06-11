import { useDispatch, useSelector } from "react-redux";
import { addRemoveFriend, getFriends } from "../redux/slice/friendSlice";

export const useFriends = () => {
  const { friends, isLoading, error } = useSelector((state) => state.friends);
  const dispatch = useDispatch();

  const get = (id, token) => {
    dispatch(getFriends({ id, token }));
  };

  const addRemove = (id, friendId, token) => {
    dispatch(addRemoveFriend({id, friendId, token}));
  };
  return { friends, isLoading, error, get, addRemove };
};
