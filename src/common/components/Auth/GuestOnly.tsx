import { Navigate } from "react-router-dom";
import { useCurrentUserQuery } from "../../../api/auth";

export default function GuestOnly({ children }: { children: JSX.Element }) {
  const { data: user, isLoading } = useCurrentUserQuery();

  return !isLoading && user ? <Navigate to="/" /> : children;
}
