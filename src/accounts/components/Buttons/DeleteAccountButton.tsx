import { useDeleteAccountMutation } from "../../../api/accounts";
import DeleteButton from "../../../common/components/ui/buttons/DeleteButton";

export default function DeleteAccountButton({
  accountId,
  onDeleted,
}: {
  accountId: number;
  onDeleted?: () => void;
}) {
  const { mutate: deleteAccount, isLoading } =
    useDeleteAccountMutation(accountId);

  return (
    <DeleteButton
      $loading={isLoading}
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
