import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserQuery, useLogoutMutation } from "../../api/auth";
import CreatePaymentButton from "../../payments/components/CreatePaymentButton";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import SecondaryButton from "./ui/buttons/SecondaryButton";
import Button from "./ui/buttons/Button";

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
    <div className="flex bg-gray-darkest p-3 text-white justify-between items-center rounded-xl shadow-lg">
      <div className="flex gap-3 items-center">
        <Link to="/" className="px-3">
          <img className="h-6" src="logo.svg" alt="cashbot" />
        </Link>
        {user ? <CreatePaymentButton /> : null}
      </div>
      {user ? (
        <div className="flex items-center">
          <Button
            $as={Link}
            to="/profile"
            $size="sm"
            className="font-medium hover:bg-black text-white"
          >
            {user.name}
          </Button>
          <Button $size="sm" onClick={logout} className="hover:bg-black">
            <ArrowRightOnRectangleIcon className="w-6 h-6 text-white" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
