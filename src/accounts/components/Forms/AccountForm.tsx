import { useFormik } from "formik";
import { useAccounts, useCreateAccount } from "../../../api/accounts";
import PrimaryButton from "../../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../../common/components/ui/buttons/SecondaryButton";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { useHandleValidationErrors } from "../../../hooks/common";
import { CreateAccountData } from "../../../types/CreateAccountData";
import { Currency } from "../../../types/Enums";

export default function AccountForm({
  onCancel = () => {},
  onSuccess = () => {},
}: {
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const { data: accounts } = useAccounts();
  const { mutate: createAccount } = useCreateAccount();
  const handleValidationErrors =
    useHandleValidationErrors<Partial<CreateAccountData>>();

  const formik = useFormik<Partial<CreateAccountData>>({
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
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.name}
          />
          <InputError>{formik.errors.name}</InputError>
        </div>
        <div>
          <Label htmlFor="balance">balance</Label>
          <Input
            type="text"
            id="balance"
            name="balance"
            value={formik.values.balance}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.balance}
          />
          <InputError>{formik.errors.balance}</InputError>
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Input
            $as="select"
            id="currency"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.currency}
          >
            <option value={""}>Please select...</option>
            {Object.keys(Currency).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Input>
          <InputError>{formik.errors.currency}</InputError>
        </div>
        <div>
          <Label htmlFor="parent_id">parent</Label>
          <Input
            $as="select"
            id="parent_id"
            name="parent_id"
            value={formik.values.parent_id}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.parent_id}
          >
            <option value={""}>Please select...</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
          <InputError>{formik.errors.parent_id}</InputError>
        </div>
        <div className="flex gap-3 justify-end">
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <PrimaryButton type="submit">Save changes</PrimaryButton>
        </div>
      </div>
    </form>
  );
}
