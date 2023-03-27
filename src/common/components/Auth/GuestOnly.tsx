import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../../api/auth";

export default function GuestOnly({ children }: { children: JSX.Element }) {
  const { data: user, isLoading } = useCurrentUser();

  return !isLoading && user ? <Navigate to="/" /> : children;
}
