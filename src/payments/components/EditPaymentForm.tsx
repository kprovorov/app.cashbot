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
import { Currency, PaymentUpdateMode, RepeatUnit } from "../../types/Enums";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Pill from "../../common/components/Pill";
import CurrencySwitch from "../../common/components/ui/forms/CurrencySwitch";
import AmountInput from "../../common/components/ui/forms/AmountInput";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import DeletePaymentButton from "./DeletePaymentButton";
import Heading from "../../common/components/Heading";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";

export default function EditPaymentForm({
  payment,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  onDeleted?: () => void;
  onUpdated?: () => void;
}>) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: accounts } = useAccounts();
  const handleValidationErrors =
    useHandleValidationErrors<UpdatePaymentGeneralData>();

  const { mutate } = useUpdatePaymentGeneralData(payment.id);

  const formik = useFormik<UpdatePaymentGeneralData>({
    initialValues: {
      account_to_id: payment.account_to_id,
      account_from_id: payment.account_from_id,
      description: payment.description,
      amount: Math.abs(payment.amount_original),
      currency: payment.currency,
      from_date: payment.date.format("YYYY-MM-DD"),
      mode: PaymentUpdateMode.SINGLE,
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: onUpdated,
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
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1 items-center">
            <CalendarDaysIcon className="w-5 h-5 text-gray" />
            <span className="font-semibold">{dateFormat(payment.date)}</span>
          </div>
          {payment.repeat_unit !== RepeatUnit.NONE ? (
            <Pill>
              Every{" "}
              {payment.repeat_interval === 1
                ? ""
                : payment.repeat_interval + " "}
              {payment.repeat_unit.toLocaleLowerCase()}
              {payment.group_repeat_ends_on ? (
                <span>
                  {" "}
                  until{" "}
                  <span className="font-semibold">
                    {dateFormat(payment.group_repeat_ends_on)}
                  </span>
                </span>
              ) : null}
            </Pill>
          ) : null}
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <AmountInput
            value={formik.values.amount}
            currency={formik.values.currency}
            onChange={(v) => formik.setFieldValue("amount", v)}
            $invalid={!!formik.errors.amount}
          />
          <CurrencySwitch
            value={formik.values.currency}
            onChange={(c) => formik.setFieldValue("currency", c)}
          />
        </div>

        <div className="flex gap-4 items-end justify-center">
          <div className="flex-grow">
            <Label htmlFor="account_from_id">Account From</Label>
            <Input
              $as="select"
              id="account_from_id"
              name="account_from_id"
              value={formik.values.account_from_id || ""}
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
          <div className="pb-4">
            <ArrowRightIcon className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <Label htmlFor="account_to_id">Account To</Label>
            <Input
              $as="select"
              id="account_to_id"
              name="account_to_id"
              value={formik.values.account_to_id || ""}
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
        </div>

        <div>
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

        <div className="flex flex-row justify-between items-center">
          <DeletePaymentButton payment={payment} onDeleted={onDeleted}>
            Delete
          </DeletePaymentButton>
          <PrimaryButton
            type="button"
            onClick={() => setShowConfirmation(true)}
          >
            Save changes
            <ChevronRightIcon className="w-6 h-6" />
          </PrimaryButton>
        </div>
      </div>
      {showConfirmation ? (
        <div className="absolute bottom-0 bg-black/50 w-full h-full flex items-end sm:items-center">
          <div className="bg-white w-full shadow-outline sm:shadow-xl rounded-t-2xl sm:rounded-2xl pb-10 sm:pb-0">
            <div className="p-6 gap-6 flex flex-col">
              <Heading>edit payment</Heading>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "This payment",
                    value: PaymentUpdateMode.SINGLE,
                  },
                  {
                    label: "This and following payments",
                    value: PaymentUpdateMode.FUTURE,
                  },
                  {
                    label: "All payments",
                    value: PaymentUpdateMode.ALL,
                  },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2">
                    <input
                      className="w-6 h-6 text-primary focus:ring-0 border-gray bg-gray-light"
                      type="radio"
                      id={item.value}
                      name="updateMode"
                      value={item.value}
                      checked={formik.values.mode === item.value}
                      onChange={() => formik.setFieldValue("mode", item.value)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <SecondaryButton
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit">
                  Confirm
                  <ChevronRightIcon className="w-6 h-6" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
