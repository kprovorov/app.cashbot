import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../api/auth";
import RegisterForm from "../Forms/RegisterForm";
import Button from "../../../common/components/ui/buttons/Button";

export default function RegisterView() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useRegisterMutation();

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
      <h1 className="uppercase font-bold">Sign up</h1>
      <RegisterForm
        isLoading={isLoading}
        onSubmit={mutate}
        onSuccess={() => navigate("/")}
      />
      <Button $as={Link} to="/auth/login">
        Login
      </Button>
    </div>
  );
}
