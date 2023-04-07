import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserQuery, useLogoutMutation } from "../../api/auth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Button from "./ui/buttons/Button";
import Logo from "./Logo";

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
      <div className="flex bg-gray-darkest p-3 text-white justify-between items-center rounded-xl shadow-lg">
        <div className="flex gap-3 items-center">
          <Link to="/" className="px-3">
            <Logo className="h-6 fill-white" />
          </Link>
        </div>
        <div className="flex items-center">
          <Button
            $as={Link}
            to="/profile"
            $size="sm"
            className="font-medium hover:bg-black text-white"
          >
            {user.name || user.email}
          </Button>
          <Button $size="sm" onClick={logout} className="hover:bg-black">
            <ArrowRightOnRectangleIcon className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    )
  );
}
