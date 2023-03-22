import { FormikErrors } from "formik";
import { useAccounts } from "../../../api/accounts";
import PrimaryButton from "../../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../../common/components/ui/buttons/SecondaryButton";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { AccountData } from "../../../types/AccountData";
import { Currency } from "../../../types/Enums";

export default function AccountForm({
  values = {},
  errors = {},
  handleChange,
  onCancel = () => {},
  onSubmit,
}: {
  values?: AccountData;
  errors?: FormikErrors<AccountData>;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  onCancel?: () => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}) {
  const { data: accounts } = useAccounts();

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            $invalid={!!errors.name}
          />
          <InputError>{errors.name}</InputError>
        </div>
        <div>
          <Label htmlFor="balance">balance</Label>
          <Input
            type="text"
            id="balance"
            name="balance"
            value={values.balance}
            onChange={handleChange}
            $invalid={!!errors.balance}
          />
          <InputError>{errors.balance}</InputError>
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Input
            $as="select"
            id="currency"
            name="currency"
            value={values.currency}
            onChange={handleChange}
            $invalid={!!errors.currency}
          >
            <option value={""}>Please select...</option>
            {Object.keys(Currency).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Input>
          <InputError>{errors.currency}</InputError>
        </div>
        <div>
          <Label htmlFor="parent_id">parent</Label>
          <Input
            $as="select"
            id="parent_id"
            name="parent_id"
            value={values.parent_id || undefined}
            onChange={handleChange}
            $invalid={!!errors.parent_id}
          >
            <option value={""}>Please select...</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
          <InputError>{errors.parent_id}</InputError>
        </div>
        <div className="flex gap-3 justify-end">
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <PrimaryButton type="submit">Save changes</PrimaryButton>
        </div>
      </div>
    </form>
  );
}
