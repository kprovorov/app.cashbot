import { useUpdateAccountMutation } from "../../../api/accounts";
import { Account } from "../../../types/Models";
import AccountForm from "../Forms/AccountForm";

export default function EditAccountView({
  account,
  onSuccess = () => {},
  onDeleted,
}: {
  account: Account;
  onSuccess?: () => void;
  onDeleted?: () => void;
}) {
  const { mutate: updateAccount, isLoading } = useUpdateAccountMutation(
    account.id
  );

  return (
    <div className="p-6">
      <AccountForm
        initialValues={account}
        isLoading={isLoading}
        onSubmit={updateAccount}
        onSuccess={onSuccess}
        onDeleted={onDeleted}
        accountId={account.id}
      />
    </div>
  );
}
