import { useDeleteAccount } from "../../../api/accounts";
import DeleteButton from "../../../common/components/ui/buttons/DeleteButton";

export default function DeleteAccountButton({
  accountId,
  onDeleted,
}: {
  accountId: number;
  onDeleted?: () => void;
}) {
  const { mutate: deleteAccount } = useDeleteAccount(accountId);

  return (
    <DeleteButton
      type="button"
      onClick={() =>
        deleteAccount(null, {
          onSuccess: onDeleted,
        })
      }
    >
      Delete
    </DeleteButton>
  );
}
