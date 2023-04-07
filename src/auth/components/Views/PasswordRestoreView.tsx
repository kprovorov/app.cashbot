import { Link } from "react-router-dom";
import { usePasswordRestoreMutation } from "../../../api/auth";
import Button from "../../../common/components/ui/buttons/Button";
import PasswordRestoreForm from "../Forms/PasswordRestoreForm";

export default function PasswordRestoreView() {
  const { mutate, isLoading } = usePasswordRestoreMutation();

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
      <h1 className="uppercase font-bold">Restore Password</h1>
      <PasswordRestoreForm isLoading={isLoading} onSubmit={mutate} />
      <Button $as={Link} to="/auth/login">
        Login
      </Button>
    </div>
  );
}
