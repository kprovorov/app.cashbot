import { PropsWithChildren, useState } from "react";
import { useAccounts } from "../../api/accounts";
import Label from "../../common/components/ui/forms/Label";
import Input from "../../common/components/ui/forms/Input";
import { useFormik } from "formik";
import { UpdatePaymentGeneralData } from "../../interfaces/UpdatePaymentGeneralData";
import { useUpdatePaymentGeneralData } from "../../api/payments";
import InputError from "../../common/components/ui/forms/InputError";
import { useHandleValidationErrors } from "../../hooks/common";
import { Payment } from "../../types/Models";
import { dateFormat } from "../../services/formatters";

export default function EditPaymentForm({
  payment,
  formId,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  formId: string;
  onUpdated: () => void;
}>) {
  const { data: accounts } = useAccounts();
  const handleValidationErrors =
    useHandleValidationErrors<UpdatePaymentGeneralData>();

  const { mutate } = useUpdatePaymentGeneralData(payment.id);

  const formik = useFormik<UpdatePaymentGeneralData>({
    initialValues: {
      account_to_id: payment.account_to_id,
      account_from_id: payment.account_from_id,
      description: payment.description,
      amount: Math.abs(payment.amount / 10000),
      currency: payment.currency,
      from_date: payment.date.format("YYYY-MM-DD"),
    },
    onSubmit: (values) => {
      mutate(
        {
          ...values,
          amount: values.amount * 10000,
        },
        {
          onSuccess: onUpdated,
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
    <form id={formId} onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 items-baseline border-b border-slate-300 p-3 justify-between">
          <span className="font-semibold">{dateFormat(payment.date)}</span>
          {payment.repeat_unit !== "none" ? (
            <div className="bg-slate-100 py-1 px-3 rounded">
              Every{" "}
              {payment.repeat_interval === 1
                ? ""
                : payment.repeat_interval + " "}
              {payment.repeat_unit}
              {payment.repeat_ends_on ? (
                <span>
                  {" "}
                  until{" "}
                  <span className="font-medium">
                    {dateFormat(payment.repeat_ends_on)}
                  </span>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-6 gap-4">
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
            <Label htmlFor="account_to_id">Account To</Label>
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
              id="description"
              name="description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              $invalid={!!formik.errors.description}
            />
            <InputError>{formik.errors.description}</InputError>
          </div>
        </div>
      </div>
    </form>
  );
}
