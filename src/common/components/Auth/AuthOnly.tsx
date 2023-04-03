import { Navigate } from "react-router-dom";
import { useCurrentUserQuery } from "../../../api/auth";

export default function AuthOnly({ children }: { children: JSX.Element }) {
  const { data: user, isLoading } = useCurrentUserQuery();

  return !isLoading && !user ? <Navigate to="/auth/login" /> : children;
}
