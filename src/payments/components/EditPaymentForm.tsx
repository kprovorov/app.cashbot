import { PropsWithChildren, useState } from "react";
import { useAccounts } from "../../api/accounts";
import Payment from "../../interfaces/Payment";
import Label from "../../common/components/ui/forms/Label";
import Input from "../../common/components/ui/forms/Input";
import { useFormik } from "formik";
import { UpdatePaymentGeneralData } from "../../interfaces/UpdatePaymentGeneralData";

import { useUpdatePaymentGeneralData } from "../../api/payments";
import { AxiosError } from "axios";
import InputError from "../../common/components/ui/forms/InputError";
import { useHandleValidationErrors } from "../../hooks/common";

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

  const [direction, setDirection] = useState<"income" | "expense">(
    payment.amount > 0 ? "income" : "expense"
  );

  const { mutate } = useUpdatePaymentGeneralData(payment.id);

  const formik = useFormik<UpdatePaymentGeneralData>({
    initialValues: {
      account_id: payment.account_id,
      description: payment.description,
      amount: Math.abs(payment.amount / 10000),
      currency: payment.currency,
      fromDate: payment.date,
    },
    onSubmit: (values) => {
      mutate(
        {
          ...values,
          amount:
            (direction === "income" ? values.amount : -values.amount) * 10000,
        },
        {
          onSuccess: () => {
            onUpdated();
          },
          onError: (error) => {
            if (error.response?.status === 422) {
              handleValidationErrors(error.response.data.errors, formik);
            }
          },
        }
      );
    },
  });

  return (
    <form id={formId} onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <Label htmlFor="account_id">Account</Label>
          <Input
            $as="select"
            id="account_id"
            name="account_id"
            value={formik.values.account_id}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.account_id}
          >
            <option value={""}>Please select...</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
          <InputError>{formik.errors.account_id}</InputError>
        </div>

        <div className="col-span-2">
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

        <div className="col-span-2">
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

        <div className="col-span-2">
          <Label htmlFor="direction">Direction</Label>
          <Input
            $as="select"
            id="direction"
            name="direction"
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value as "expense" | "income");
            }}
          >
            <option value="expense">expense</option>
            <option value="income">income</option>
          </Input>
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
    </form>
  );
}
