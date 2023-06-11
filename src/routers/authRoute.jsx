import { Navigate, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // check if user is login then redirect to home page 
  useEffect(() => {
    user && navigate("/");
  }, [user]);
  return <>{children}</>;
};
export default AuthRoute;
