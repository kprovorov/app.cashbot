import { Link, useSearchParams } from "react-router-dom";
import { usePasswordResetMutation } from "../../../api/auth";
import PasswordResetForm from "../Forms/PasswordResetForm";
import Button from "../../../common/components/ui/buttons/Button";

export default function PasswordResetView() {
  const { mutate, isLoading } = usePasswordResetMutation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
      <h1 className="uppercase font-bold">Create new password</h1>
      <PasswordResetForm
        loading={isLoading}
        onSubmit={(values, options) => {
          mutate(
            {
              ...values,
              email,
              token,
            },
            options
          );
        }}
      />
      <Button $as={Link} to="/auth/login">
        Login
      </Button>
    </div>
  );
}
