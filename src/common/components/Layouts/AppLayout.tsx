import { Outlet } from "react-router-dom";
import TheHeader from "../TheHeader";

export default function AppLayout() {
  return (
    <>
      <div className="p-md pb-0">
        <TheHeader />
      </div>
      <Outlet />
    </>
  );
}
