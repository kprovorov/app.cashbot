import { Link } from "react-router-dom";
import { usePasswordRestoreMutation } from "../../../api/auth";
import Button from "../../../common/components/ui/buttons/Button";
import { PasswordRestoreData } from "../../../types/AuthData";
import PasswordRestoreForm from "../Forms/PasswordRestoreForm";

export default function PasswordRestoreView() {
  const { mutate, isLoading } = usePasswordRestoreMutation();

  const submit = (values: PasswordRestoreData) => {
    mutate(values);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
      <h1 className="uppercase font-bold">Restore Password</h1>
      <PasswordRestoreForm onSubmit={submit} loading={isLoading} />
      <Button $as={Link} to="/auth/login">
        Login
      </Button>
    </div>
  );
}
