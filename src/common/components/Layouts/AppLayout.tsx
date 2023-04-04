import { Outlet } from "react-router-dom";
import TheHeader from "../TheHeader";

export default function AppLayout() {
  return (
    <>
      <TheHeader />
      <Outlet />
    </>
  );
}
