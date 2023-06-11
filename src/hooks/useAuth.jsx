import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/slice/authSlice";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const login = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { user, isLoading, error, login };
};
