import { useFormik } from "formik";
import { useAccountsQuery, useCreateAccount } from "../../../api/accounts";
import { useHandleValidationErrors } from "../../../hooks/common";
import { AccountData } from "../../../types/AccountData";
import AccountForm from "../Forms/AccountForm";
import { Account } from "../../../types/Models";
import Info from "../../../common/components/Info";

export default function CreateAccountView({
  parent,
  onSuccess = () => {},
}: {
  parent?: Account;
  onSuccess?: () => void;
}) {
  const { mutate: createAccount, isLoading } = useCreateAccount();
  const handleValidationErrors = useHandleValidationErrors<AccountData>();

  const formik = useFormik<AccountData>({
    initialValues: {
      name: "",
      balance: 0,
      currency: parent?.currency,
      parent_id: parent?.id,
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
    <div className="flex flex-col p-6 gap-6">
      {parent ? (
        <Info>
          <span>
            Jar is a virtual savings account inside of your «parent» account{" "}
            <span className="font-semibold"> {parent.name}</span>
          </span>
        </Info>
      ) : null}
      <AccountForm
        loading={isLoading}
        parent={parent}
        values={formik.values}
        errors={formik.errors}
        handleChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
      />
    </div>
  );
}
