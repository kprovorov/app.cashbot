import { Outlet } from "react-router-dom";
import TheHeader from "../TheHeader";

export default function MainLayout() {
  return (
    <div className="flex flex-col items-stretch h-full">
      <TheHeader />
      <Outlet />
    </div>
  );
}
