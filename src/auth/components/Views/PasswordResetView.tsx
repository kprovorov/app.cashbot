import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import { usePasswordResetMutation } from "../../../api/auth";
import { PasswordResetData } from "../../../types/AuthData";
import PasswordResetForm from "../Forms/PasswordResetForm";
import Link from "../Misc/Link";

export default function PasswordResetView() {
  const { mutate, isLoading } = usePasswordResetMutation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const submit = (values: Omit<PasswordResetData, "token" | "email">) => {
    mutate({
      ...values,
      email,
      token,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-3 w-full">
      <h1 className="uppercase font-bold">Create new password</h1>
      <PasswordResetForm onSubmit={submit} loading={isLoading} />
      <div className="flex justify-center">
        <Link href="/auth/login">Login</Link>
      </div>
    </div>
  );
}
