import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserQuery, useLogoutMutation } from "../../api/auth";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Button from "./ui/buttons/Button";
import Logo from "./Logo";
import { Menu } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function TheHeader() {
  const navigate = useNavigate();
  const { mutate } = useLogoutMutation();
  const { data: user } = useCurrentUserQuery();

  const logout = () => {
    mutate(
      {},
      {
        onSuccess: () => navigate("/auth/login"),
      }
    );
  };

  return (
    !!user && (
      <div className="flex bg-gray-darkest p-md text-white justify-between items-center rounded-xl shadow-lg">
        <div className="flex gap-3 items-center">
          <Link to="/">
            <Logo className="h-6 fill-white" />
          </Link>
        </div>
        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex gap-1 justify-center items-center hover:bg-black p-sm rounded">
              {user.name || user.email} <ChevronDownIcon className="h-5 w-5" />
            </Menu.Button>
            <Menu.Items className="absolute bg-white shadow rounded-md flex flex-col right-0 z-10 w-48 divide-y divide-gray-lightest">
              <div className="p-sm flex flex-col">
                <Menu.Item
                  as={Link}
                  to="/profile"
                  className="flex justify-start gap-sm font-medium text-gray-darkest hover:bg-gray-lightest p-sm rounded"
                >
                  <UserIcon className="h-6 w-6  text-gray" />
                  Profile
                </Menu.Item>
              </div>
              <div className="p-sm flex flex-col">
                <Menu.Item
                  as="button"
                  onClick={logout}
                  className="flex justify-start gap-sm font-medium text-gray-darkest hover:bg-gray-lightest p-sm rounded"
                >
                  <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray" />
                  Logout
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    )
  );
}
