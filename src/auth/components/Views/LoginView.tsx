import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../api/auth";
import LoginForm from "../Forms/LoginForm";
import Button from "../../../common/components/ui/buttons/Button";

export default function LoginView() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useLoginMutation();

  return (
    <div className="flex flex-col gap-md">
      <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
        <h1 className="uppercase font-bold">Login</h1>
        <LoginForm
          isLoading={isLoading}
          onSubmit={login}
          onSuccess={() => navigate("/")}
        />
        <Button $as={Link} to="/auth/password/restore">
          Forgot password?
        </Button>
      </div>
      <Button $as={Link} to="/auth/register">
        Don't have account? Sign up here
      </Button>
    </div>
  );
}
