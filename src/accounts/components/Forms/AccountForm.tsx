import { FormikErrors } from "formik";
import { useAccountsQuery } from "../../../api/accounts";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { AccountData } from "../../../types/AccountData";
import { Currency } from "../../../types/Enums";
import SubmitButton from "../../../common/components/ui/buttons/SubmitButton";
import DeleteAccountButton from "../Buttons/DeleteAccountButton";
import { Account } from "../../../types/Models";

export default function AccountForm({
  loading = false,
  accountId,
  parent,
  values = {},
  errors = {},
  handleChange,
  onSubmit,
  onDeleted,
}: {
  loading?: boolean;
  accountId?: number;
  parent?: Account;
  values?: AccountData;
  errors?: FormikErrors<AccountData>;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  onDeleted?: () => void;
}) {
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
        {!parent ? (
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
        ) : null}

        <div className="flex gap-3 justify-between">
          {accountId ? (
            <DeleteAccountButton accountId={accountId} onDeleted={onDeleted} />
          ) : null}
          <SubmitButton
            type="submit"
            $loading={loading}
            className={`${accountId ? "" : "flex-grow"}`}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
