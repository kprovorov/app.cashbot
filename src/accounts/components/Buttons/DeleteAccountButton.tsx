import { useDeleteAccount } from "../../../api/accounts";
import DeleteButton from "../../../common/components/ui/buttons/DeleteButton";

export default function DeleteAccountButton({
  accountId,
}: {
  accountId: number;
}) {
  const { mutate: deleteAccount } = useDeleteAccount(accountId);

  return <DeleteButton onClick={() => deleteAccount()}>Delete</DeleteButton>;
}
