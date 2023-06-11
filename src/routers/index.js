import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Message from "../pages/message";
import Profile from "../pages/profile";
import Register from "../pages/register";
import Main from "../template/main";
import AuthRoute from "./authRoute";
import PrivateRoute from "./privateRoute";

const routers = createBrowserRouter([
  //! main template with protected routes
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/user/:id", element: <Profile /> },
      // { path: "/message", element: <Message /> },
    ],
  },
  {
    path: "/message/:id?",
    element: (
      <PrivateRoute>
        <Message />
      </PrivateRoute>
    ),
  },
  //! auth pages
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
  },
]);

export default routers;
