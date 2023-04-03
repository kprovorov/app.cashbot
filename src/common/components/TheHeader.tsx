import { useNavigate } from "react-router-dom";
import { useCurrentUserQuery, useLogoutMutation } from "../../api/auth";
import CreatePaymentButton from "../../payments/components/CreatePaymentButton";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "./ui/buttons/SecondaryButton";

export default function TheHeader() {
  const navigate = useNavigate();
  const { mutate } = useLogoutMutation();
  const { data: user } = useCurrentUserQuery();

  const logout = () => {
    mutate(
      {},
      {
        onSuccess: () => navigate("/"),
      }
    );
  };

  return (
    <div className="flex bg-gray-dark p-3 text-white justify-between items-center">
      <div className="flex gap-3 items-center">
        <a href="/" className="px-3">
          <img className="h-6" src="logo.svg" alt="cashbot" />
        </a>
        {user ? <CreatePaymentButton /> : null}
      </div>
      {user ? (
        <div className="flex items-center gap-3">
          <div>{user.name}</div>
          <div>
            <SecondaryButton onClick={logout}>
              <ArrowRightOnRectangleIcon className="w-6 h-6 text-white" />
            </SecondaryButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
