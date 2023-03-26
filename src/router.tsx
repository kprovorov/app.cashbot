import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./common/components/Layouts/AuthLayout";
import MainLayout from "./common/components/Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import PasswordRestore from "./pages/PasswordRestore";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "password/restore",
        element: <PasswordRestore />,
      },
      {
        path: "password/reset",
        element: <PasswordReset />,
      },
    ],
  },
]);
