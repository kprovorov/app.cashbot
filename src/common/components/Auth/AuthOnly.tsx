import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../../api/auth";

export default function AuthOnly({ children }: { children: JSX.Element }) {
  const { data: user, isLoading } = useCurrentUser();

  return !isLoading && !user ? <Navigate to="/auth/login" /> : children;
}
