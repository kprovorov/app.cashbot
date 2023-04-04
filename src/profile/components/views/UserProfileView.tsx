import { useCurrentUserQuery } from "../../../api/auth";
import { useUpdateUserProfileMutation } from "../../../api/profile";
import UserProfileForm from "../forms/UserProfileForm";

export default function UserProfileView() {
  const { data: user } = useCurrentUserQuery();
  const { mutate, isLoading } = useUpdateUserProfileMutation();

  return (
    <UserProfileForm
      onSubmit={mutate}
      initialValues={user}
      isLoading={isLoading}
    />
  );
}
