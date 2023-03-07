import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { createPayment, useAccounts } from "../../api/accounts";
import CreatePaymentData from "../../interfaces/CreatePaymentData";
import moment from "moment";
import AccountsContext from "../../context/AccountsContext";
import Input from "../../common/components/ui/forms/Input";
import Label from "../../common/components/ui/forms/Label";
import { useFormik } from "formik";
import { useCreatePayment } from "../../api/payments";
import { useHandleValidationErrors } from "../../hooks/common";
import InputError from "../../common/components/ui/forms/InputError";

export default function CreatePaymentForm({
  formId,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  onCreated: () => void;
}>) {
  const handleValidationErrors = useHandleValidationErrors<CreatePaymentData>();
  const { mutate } = useCreatePayment();
  const [direction, setDirection] = useState<"income" | "expense">("expense");

  const formik = useFormik<CreatePaymentData>({
    initialValues: {
      account_id: 0,
      description: "",
      amount: 0,
      date: "",
      repeat_unit: "none",
      repeat_interval: 1,
      repeat_ends_on: "",
      currency: "UAH",
      hidden: false,
      auto_apply: false,
      ends_on: "",
    },
    onSubmit: (values) => {
      mutate(
        {
          ...values,
          amount:
            (direction === "income" ? values.amount : -values.amount) * 10000,
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
          <Label>Date</Label>
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
          <Label>Ends</Label>
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
          <Label>Repeat Unit</Label>
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
          <Label>Repeat interval</Label>
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
          <Label>Repeat Ends</Label>
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

        <div className="col-span-6">
          <Label>Account</Label>
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
          <Label>Amount</Label>
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
          <Label>Currency</Label>
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
          <Label>Direction</Label>
          <Input
            $as="select"
            id="direction"
            name="direction"
            value={direction}
            onChange={(e): void => {
              setDirection(e.target.value as "expense" | "income");
            }}
          >
            <option value="expense">expense</option>
            <option value="income">income</option>
          </Input>
        </div>

        <div className="col-span-6">
          <Label>Description</Label>
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
