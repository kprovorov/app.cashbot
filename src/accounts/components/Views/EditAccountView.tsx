import { useFormik } from "formik";
import { useUpdateAccount } from "../../../api/accounts";
import { useHandleValidationErrors } from "../../../hooks/common";
import { AccountData } from "../../../types/AccountData";
import { Account } from "../../../types/Models";
import DeleteAccountButton from "../Buttons/DeleteAccountButton";
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
  const { mutate: updateAccount, isLoading } = useUpdateAccount(account.id);
  const handleValidationErrors = useHandleValidationErrors<AccountData>();

  const formik = useFormik<AccountData>({
    initialValues: {
      ...account,
      balance: account.balance / 100,
    },
    onSubmit: (values) => {
      updateAccount(
        {
          ...values,
          balance: (values.balance || 0) * 100,
        },
        {
          onSuccess,
          onError: (error) => {
            if (error.response?.status === 422) {
              handleValidationErrors(error, formik);
            }
          },
        }
      );
    },
  });

  return (
    <div className="p-6">
      <AccountForm
        loading={isLoading}
        accountId={account.id}
        values={formik.values}
        errors={formik.errors}
        handleChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
        onDeleted={onDeleted}
      />
    </div>
  );
}
