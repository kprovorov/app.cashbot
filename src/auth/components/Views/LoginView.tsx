import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../api/auth";
import LoginFormData from "../../../interfaces/LoginFormData";
import LoginForm from "../Forms/LoginForm";
import SecondaryButton from "../../../common/components/ui/buttons/SecondaryButton";
import Button from "../../../common/components/ui/buttons/Button";

export default function LoginView() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useLoginMutation();

  const submit = (values: LoginFormData) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
      <h1 className="uppercase font-bold">Login</h1>
      <LoginForm onSubmit={submit} loading={isLoading} />
      <Button $as={Link} to="/auth/password/restore">
        Forgot password?
      </Button>
    </div>
  );
}
