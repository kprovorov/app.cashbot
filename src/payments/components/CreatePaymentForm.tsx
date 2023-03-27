import { PropsWithChildren, useState } from "react";
import { useAccounts } from "../../api/accounts";
import CreatePaymentData from "../../interfaces/CreatePaymentData";
import moment from "moment";
import Input from "../../common/components/ui/forms/Input";
import Label from "../../common/components/ui/forms/Label";
import { useFormik } from "formik";
import { useCreatePayment } from "../../api/payments";
import { useHandleValidationErrors } from "../../hooks/common";
import InputError from "../../common/components/ui/forms/InputError";
import { Currency, PaymentType, RepeatUnit } from "../../types/Enums";
import Checkbox from "../../common/components/ui/forms/Checkbox";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import { Tab } from "@headlessui/react";

export default function CreatePaymentForm({
  onCreated,
  onCancel = () => {},
}: PropsWithChildren<{
  onCreated: () => void;
  onCancel?: () => void;
}>) {
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.EXPENSE
  );
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
      budget: paymentType === PaymentType.BUDGET,
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
          budget: paymentType === PaymentType.BUDGET,
          account_from_id: [
            PaymentType.EXPENSE,
            PaymentType.TRANSFER,
            PaymentType.BUDGET,
          ].includes(paymentType)
            ? values.account_from_id
            : undefined,
          account_to_id: [PaymentType.INCOME, PaymentType.TRANSFER].includes(
            paymentType
          )
            ? values.account_to_id
            : undefined,
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
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="bg-slate-100 p-2 rounded-lg">
            <Tab.Group
              defaultIndex={Object.values(PaymentType).indexOf(paymentType)}
            >
              <Tab.List>
                {Object.values(PaymentType).map((key) => (
                  <Tab
                    key={key}
                    className="ui-selected:bg-white ui-selected:shadow ui-selected:shadow-slate-200 border border-transparent ui-selected:border-slate-200 px-3 py-1 rounded capitalize font-semibold ui-selected:text-primary"
                    onClick={() => setPaymentType(key)}
                  >
                    {key.toLowerCase()}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>

        <div className="col-span-6 sm:col-span-3">
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
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="repeat_unit">Repeat Unit</Label>
          <Input
            $as="select"
            id="repeat_unit"
            name="repeat_unit"
            value={formik.values.repeat_unit}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.repeat_unit}
          >
            {Object.keys(RepeatUnit).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Input>
          <InputError>{formik.errors.repeat_unit}</InputError>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="repeat_interval">Repeat interval</Label>
          <Input
            disabled={formik.values.repeat_unit === RepeatUnit.NONE}
            type="number"
            id="repeat_interval"
            name="repeat_interval"
            value={formik.values.repeat_interval}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.repeat_interval}
          />
          <InputError>{formik.errors.repeat_interval}</InputError>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="repeat_ends_on">Repeat Ends</Label>
          <Input
            disabled={formik.values.repeat_unit === RepeatUnit.NONE}
            type="date"
            id="repeat_ends_on"
            name="repeat_ends_on"
            value={moment(formik.values.repeat_ends_on).format("YYYY-MM-DD")}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.repeat_ends_on}
          />
          <InputError>{formik.errors.repeat_ends_on}</InputError>
        </div>

        <div className="col-span-6 sm:col-span-3">
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
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="currency">Currency</Label>
          <Input
            $as="select"
            id="currency"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.currency}
          >
            {Object.keys(Currency).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Input>
          <InputError>{formik.errors.currency}</InputError>
        </div>

        {[
          PaymentType.EXPENSE,
          PaymentType.TRANSFER,
          PaymentType.BUDGET,
        ].includes(paymentType) && (
          <div className="col-span-6 sm:col-span-3">
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
        )}

        {[PaymentType.INCOME, PaymentType.TRANSFER].includes(paymentType) && (
          <div className="col-span-6 sm:col-span-3">
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
        )}

        <div className="col-span-12">
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
        <div className="col-span-12 flex justify-end gap-3">
          <SecondaryButton onClick={onCancel}>Close</SecondaryButton>
          <PrimaryButton type="submit">Save changes</PrimaryButton>
        </div>
      </div>
    </form>
  );
}
