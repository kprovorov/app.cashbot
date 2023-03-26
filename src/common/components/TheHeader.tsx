import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLogoutMutation } from "../../api/auth";
import CreatePaymentButton from "../../payments/components/CreatePaymentButton";
import HeaderButton from "./HeaderButton";

export default function TheHeader() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const { mutate } = useLogoutMutation();

  const logout = () => {
    mutate(
      {},
      {
        onSuccess: () => navigate("/"),
      }
    );
  };

  return (
    <div className="flex bg-slate-800 p-3 text-white justify-between items-center">
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
            <HeaderButton onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </HeaderButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
