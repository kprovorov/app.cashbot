import { useFormik } from "formik";
import { useUpdateAccount } from "../../../api/accounts";
import { useHandleValidationErrors } from "../../../hooks/common";
import { AccountData } from "../../../types/AccountData";
import { Account } from "../../../types/Models";
import AccountForm from "../Forms/AccountForm";

export default function EditAccountView({
  account,
  onCancel = () => {},
  onSuccess = () => {},
}: {
  account: Account;
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const { mutate: updateAccount } = useUpdateAccount(account.id);
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
    <div>
      <AccountForm
        values={formik.values}
        errors={formik.errors}
        handleChange={formik.handleChange}
        onCancel={onCancel}
        onSubmit={formik.handleSubmit}
      />
    </div>
  );
}
