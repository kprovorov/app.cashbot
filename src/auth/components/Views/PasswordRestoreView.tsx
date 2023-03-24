import { useNavigate } from "react-router-dom";
import { usePasswordRestoreMutation } from "../../../api/auth";
import { PasswordRestoreData } from "../../../types/AuthData";
import PasswordRestoreForm from "../Forms/PasswordRestoreForm";
import Link from "../Misc/Link";

export default function PasswordRestoreView() {
  const { mutate } = usePasswordRestoreMutation();

  const submit = (values: PasswordRestoreData) => {
    mutate(values);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
      <h1 className="uppercase font-bold">Restore Password</h1>
      <PasswordRestoreForm onSubmit={submit} />
      <div className="flex justify-center">
        <Link href="/auth/login">Login</Link>
      </div>
    </div>
  );
}
