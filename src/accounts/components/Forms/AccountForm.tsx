import { useFormik } from "formik";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { AccountData } from "../../../types/AccountData";
import { Currency } from "../../../types/Enums";
import SubmitButton from "../../../common/components/ui/buttons/SubmitButton";
import DeleteAccountButton from "../Buttons/DeleteAccountButton";
import { Account } from "../../../types/Models";
import { MutateOptions } from "react-query";
import { AxiosError } from "axios";
import {
  BackendErrorResponse,
  useHandleValidationErrors,
} from "../../../hooks/common";
import { AccountRaw } from "../../../types/ModelsRaw";
import AmountInput from "../../../common/components/ui/forms/AmountInput";
import CurrencySwitch from "../../../common/components/ui/forms/CurrencySwitch";

export default function AccountForm({
  initialValues = {
    name: "",
    balance: 0,
    currency: undefined,
    parent_id: undefined,
  },
  isLoading = false,
  onSubmit,
  onSuccess,
  onDeleted,
  accountId,
  parent,
}: {
  initialValues?: AccountData;
  isLoading?: boolean;
  onSubmit: (
    values: AccountData,
    options?: MutateOptions<
      AccountRaw,
      AxiosError<BackendErrorResponse>,
      AccountData
    >
  ) => void;
  onSuccess?: () => void;
  onDeleted?: () => void;
  accountId?: number;
  parent?: Account;
}) {
  const handleValidationErrors = useHandleValidationErrors<AccountData>();

  const formik = useFormik<AccountData>({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values, {
        onSuccess,
        onError: (error) => {
          if (error.response?.status === 422) {
            handleValidationErrors(error, formik);
          }
        },
      });
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
        <div className="flex flex-col items-center justify-center py-8">
          <AmountInput
            value={formik.values.balance || 0}
            currency={formik.values.currency || Currency.EUR}
            onChange={(v) => formik.setFieldValue("balance", v)}
            $invalid={!!formik.errors.balance}
          />
          {!parent ? (
            <CurrencySwitch
              value={formik.values.currency || Currency.EUR}
              onChange={(c) => formik.setFieldValue("currency", c)}
            />
          ) : null}
        </div>

        <div className="flex gap-3 justify-between">
          {accountId ? (
            <DeleteAccountButton accountId={accountId} onDeleted={onDeleted} />
          ) : null}
          <SubmitButton
            type="submit"
            $loading={isLoading}
            className={`${accountId ? "" : "flex-grow"}`}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
