import { Outlet } from "react-router-dom";
import Logo from "../Logo";

export default function AuthLayout() {
  return (
    <div className="h-full flex flex-col justify-between items-stretch p-12">
      <div className="flex flex-col justify-center items-center">
        <a href="/" className="py-16">
          <Logo className="h-12 fill-gray-darkest " />
        </a>
        <div className="w-full sm:w-1/2 lg:w-1/2">
          <Outlet />
        </div>
      </div>
      <div className="text-gray text-center">Made in Ukraine 🇺🇦</div>
    </div>
  );
}
