import { useCurrentUserQuery } from "../api/auth";
import Heading from "../common/components/Heading";
import Card from "../common/components/ui/card/Card";
import UserProfileView from "../profile/components/views/UserProfileView";

export default function Profile() {
  const { data: user } = useCurrentUserQuery();

  return (
    <div className="p-lg">
      {user ? (
        <Card className="divide-y divide-gray-light">
          <div className="p-lg">
            <Heading>{user.name}</Heading>
          </div>
          <div className="p-lg">
            <UserProfileView />
          </div>
          <div className="p-lg">password</div>
        </Card>
      ) : null}
    </div>
  );
}
