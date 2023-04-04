import { useCurrentUserQuery } from "../api/auth";
import Heading from "../common/components/Heading";
import Card from "../common/components/ui/card/Card";
import UserPasswordView from "../profile/components/views/UserPasswordView";
import UserProfileView from "../profile/components/views/UserProfileView";

export default function Profile() {
  const { data: user } = useCurrentUserQuery();

  return (
    <div className="p-md flex flex-col items-center w-full">
      {user ? (
        <Card className="divide-y divide-gray-light w-full max-w-[500px]">
          <div className="p-lg">
            <Heading>{user.name}</Heading>
          </div>
          <div className="p-lg flex flex-col gap-md">
            <h2 className="text-xl font-semibold">Update profile</h2>
            <UserProfileView />
          </div>
          <div className="p-lg flex flex-col gap-md">
            <h2 className="text-xl font-semibold">Update password</h2>
            <UserPasswordView />
          </div>
        </Card>
      ) : null}
    </div>
  );
}
