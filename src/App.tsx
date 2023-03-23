import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./common/components/Layouts/AuthLayout";
import PasswordRestore from "./pages/PasswordRestore";
import PasswordReset from "./pages/PasswordReset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
