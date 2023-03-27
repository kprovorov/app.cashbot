import { createBrowserRouter } from "react-router-dom";
import AuthOnly from "./common/components/Auth/AuthOnly";
import GuestOnly from "./common/components/Auth/GuestOnly";
import AuthLayout from "./common/components/Layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import PasswordRestore from "./pages/PasswordRestore";

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthOnly>
        <Dashboard />
      </AuthOnly>
    ),
  },
  {
    path: "/auth",
    element: (
      <GuestOnly>
        <AuthLayout />
      </GuestOnly>
    ),
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
