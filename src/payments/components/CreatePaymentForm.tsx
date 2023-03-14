import { PropsWithChildren } from "react";
import { useAccounts } from "../../api/accounts";
import CreatePaymentData from "../../interfaces/CreatePaymentData";
import moment from "moment";
import Input from "../../common/components/ui/forms/Input";
import Label from "../../common/components/ui/forms/Label";
import { useFormik } from "formik";
import { useCreatePayment } from "../../api/payments";
import { useHandleValidationErrors } from "../../hooks/common";
import InputError from "../../common/components/ui/forms/InputError";
import { Currency, RepeatUnit } from "../../types/Enums";

export default function CreatePaymentForm({
  formId,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  onCreated: () => void;
}>) {
  const handleValidationErrors = useHandleValidationErrors<CreatePaymentData>();
  const { mutate } = useCreatePayment();

  const formik = useFormik<CreatePaymentData>({
    initialValues: {
      account_to_id: undefined,
      account_from_id: undefined,
      description: "",
      amount: 0,
      currency: Currency.UAH,
      date: "",
      hidden: false,
      ends_on: "",
      auto_apply: false,
      repeat_unit: RepeatUnit.NONE,
      repeat_interval: 1,
      repeat_ends_on: "",
    },
    onSubmit: (values) => {
      mutate(
        {
          ...values,
          amount: values.amount * 100,
        },
        {
          onSuccess: onCreated,
          onError: (error) => {
            if (error.response?.status === 422) {
              handleValidationErrors(error, formik);
            }
          },
        }
      );
    },
  });

  const { data: accounts } = useAccounts();

  return (
    <form id={formId} onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={moment(formik.values.date).format("YYYY-MM-DD")}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.date}
          />
          <InputError>{formik.errors.date}</InputError>
        </div>
        <div className="col-span-3">
          <Label htmlFor="ends_on">Ends</Label>
          <Input
            type="date"
            id="ends_on"
            name="ends_on"
            value={moment(formik.values.ends_on).format("YYYY-MM-DD")}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.ends_on}
          />
          <InputError>{formik.errors.ends_on}</InputError>
        </div>
        <div className="col-span-2">
          <Label htmlFor="repeat_unit">Repeat Unit</Label>
          <Input
            $as="select"
            id="repeat_unit"
            name="repeat_unit"
            value={formik.values.repeat_unit}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.repeat_unit}
          >
            <option value="none">never</option>
            <option value="day">daily</option>
            <option value="week">weekly</option>
            <option value="month">monthly</option>
            <option value="quarter">quarterly</option>
            <option value="year">yearly</option>
          </Input>
          <InputError>{formik.errors.repeat_unit}</InputError>
        </div>

        <div className="col-span-2">
          <Label htmlFor="repeat_interval">Repeat interval</Label>
          <Input
            disabled={formik.values.repeat_unit === "none"}
            type="number"
            id="repeat_interval"
            name="repeat_interval"
            value={formik.values.repeat_interval}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.repeat_interval}
          />
          <InputError>{formik.errors.repeat_interval}</InputError>
        </div>

        <div className="col-span-2">
          <Label htmlFor="repeat_ends_on">Repeat Ends</Label>
          <Input
            disabled={formik.values.repeat_unit === "none"}
            type="date"
            id="repeat_ends_on"
            name="repeat_ends_on"
            value={moment(formik.values.repeat_ends_on).format("YYYY-MM-DD")}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.repeat_ends_on}
          />
          <InputError>{formik.errors.repeat_ends_on}</InputError>
        </div>

        <div className="col-span-3">
          <Label htmlFor="account_from_id">Account From</Label>
          <Input
            $as="select"
            id="account_from_id"
            name="account_from_id"
            value={formik.values.account_from_id}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.account_from_id}
          >
            <option value={""}>Please select...</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
          <InputError>{formik.errors.account_from_id}</InputError>
        </div>
        <div className="col-span-3">
          <Label htmlFor="account_to_id">Account From</Label>
          <Input
            $as="select"
            id="account_to_id"
            name="account_to_id"
            value={formik.values.account_to_id}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.account_to_id}
          >
            <option value={""}>Please select...</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
          <InputError>{formik.errors.account_to_id}</InputError>
        </div>

        <div className="col-span-3">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="text"
            id="amount"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.amount}
          />
          <InputError>{formik.errors.amount}</InputError>
        </div>
        <div className="col-span-3">
          <Label htmlFor="currency">Currency</Label>
          <Input
            $as="select"
            id="currency"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.currency}
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Input>
          <InputError>{formik.errors.currency}</InputError>
        </div>

        <div className="col-span-6">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.description}
          />
          <InputError>{formik.errors.description}</InputError>
        </div>
      </div>
    </form>
  );
}
