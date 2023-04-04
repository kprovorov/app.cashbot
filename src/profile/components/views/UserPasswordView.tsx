import { useUpdateUserPasswordMutation } from "../../../api/profile";
import UserPasswordForm from "../forms/UserPasswordForm";

export default function UserPasswordView() {
  const { mutate, isLoading } = useUpdateUserPasswordMutation();

  return <UserPasswordForm onSubmit={mutate} isLoading={isLoading} />;
}
