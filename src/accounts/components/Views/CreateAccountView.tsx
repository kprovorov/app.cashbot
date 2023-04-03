import { useFormik } from "formik";
import { useAccountsQuery, useCreateAccount } from "../../../api/accounts";
import { useHandleValidationErrors } from "../../../hooks/common";
import { AccountData } from "../../../types/AccountData";
import AccountForm from "../Forms/AccountForm";

export default function CreateAccountView({
  onCancel = () => {},
  onSuccess = () => {},
}: {
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const { mutate: createAccount } = useCreateAccount();
  const handleValidationErrors = useHandleValidationErrors<AccountData>();

  const formik = useFormik<AccountData>({
    initialValues: {
      name: "",
      balance: 0,
      currency: undefined,
      parent_id: undefined,
    },
    onSubmit: (values) => {
      createAccount(
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
        values={formik.values}
        errors={formik.errors}
        handleChange={formik.handleChange}
        onCancel={onCancel}
        onSubmit={formik.handleSubmit}
      />
    </div>
  );
}
