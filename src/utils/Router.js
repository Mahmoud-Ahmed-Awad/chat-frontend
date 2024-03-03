import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import Chat from "../Chat";
import EditProfile from "../profile/EditProfile";

function Logout() {
  window.localStorage.removeItem("token");
  window.location.href = "/";
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/chat/:id",
    element: <Chat />,
  },
  {
    path: "/editProfile",
    element: <EditProfile />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
