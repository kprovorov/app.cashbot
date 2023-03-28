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
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import { Menu, Tab } from "@headlessui/react";
import Button from "../../common/components/ui/buttons/Button";
import { currencyFormat } from "../../services/formatters";
import Datepicker from "../../common/components/ui/forms/Datepicker";

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
  const [customRepeat, setCustomRepeat] = useState(false);
  const descriptions: { [key in PaymentType]: string } = {
    [PaymentType.EXPENSE]: "Plan expense payment",
    [PaymentType.INCOME]: "Plan income payment",
    [PaymentType.TRANSFER]: "Transfer between your accounts",
    [PaymentType.BUDGET]:
      "When budgeting expenses, the amount decreases daily. For instance, if you set a weekly payment of 700 EUR, after 2 days, it displays as 500 EUR.",
  };
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
      <div className="flex flex-col gap-4">
        <div className="bg-slate-100 p-2 rounded-lg">
          <Tab.Group
            defaultIndex={Object.values(PaymentType).indexOf(paymentType)}
          >
            <Tab.List>
              {Object.values(PaymentType).map((key) => (
                <Tab
                  key={key}
                  className="ui-selected:bg-white ui-selected:shadow ui-selected:shadow-slate-300 px-3 py-1 rounded capitalize font-semibold"
                  onClick={() => setPaymentType(key)}
                >
                  {key.toLowerCase()}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>

        <div className="flex flex-row items-top gap-2 text-slate-400">
          <div className="w-8 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
          <div className="flex items-center">{descriptions[paymentType]}</div>
        </div>

        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex flex-col items-center p-4 w-full">
            <Input
              type="text"
              className="text-center text-5xl border-none focus:outline-none focus:ring-0 bg-transparent"
              id="amount"
              name="amount"
              value={currencyFormat(
                formik.values.amount,
                formik.values.currency
              )}
              onChange={(e) => {
                formik.setFieldValue(
                  "amount",
                  Number(e.target.value.replace(/\D/g, "")) * 100
                );
              }}
              $invalid={!!formik.errors.amount}
              autoComplete="off"
            />

            <Button
              type="button"
              className="border-none hover:bg-slate-100"
              onClick={() => {
                const currencies = Object.values(Currency);

                const index = currencies.indexOf(formik.values.currency);

                formik.setFieldValue(
                  "currency",
                  currencies[index + 1 >= currencies.length ? 0 : index + 1]
                );
              }}
            >
              {formik.values.currency}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M13.2 2.24a.75.75 0 00.04 1.06l2.1 1.95H6.75a.75.75 0 000 1.5h8.59l-2.1 1.95a.75.75 0 101.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 00-1.06.04zm-6.4 8a.75.75 0 00-1.06-.04l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 101.02-1.1l-2.1-1.95h8.59a.75.75 0 000-1.5H4.66l2.1-1.95a.75.75 0 00.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
          <InputError>{formik.errors.amount}</InputError>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Datepicker
              id="date"
              name="date"
              $invalid={!!formik.errors.date}
              selected={
                formik.values.date ? new Date(formik.values.date) : null
              }
              onChange={(date) =>
                formik.setFieldValue("date", date?.toISOString())
              }
            />
            <InputError>{formik.errors.date}</InputError>
          </div>

          <div>
            <Menu as="div" className="relative">
              <Menu.Button
                as={SecondaryButton}
                className="w-full flex flex-row justify-between  text-slate-900  font-sans leading-tight py-2 px-3"
              >
                <span>
                  {customRepeat
                    ? "custom"
                    : formik.values.repeat_unit === RepeatUnit.NONE
                    ? "don't repeat"
                    : `every ${formik.values.repeat_unit.toLowerCase()}`}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
              <Menu.Items className="absolute bg-white shadow-lg shadow-slate-400/40 p-3 border border-slate-200 rounded-md flex flex-col">
                {[
                  {
                    label: "Don't repeat",
                    onClick: () => {
                      formik.setFieldValue("repeat_interval", 1);
                      formik.setFieldValue("repeat_unit", RepeatUnit.NONE);
                      formik.setFieldValue("repeat_ends_on", "");
                      setCustomRepeat(false);
                    },
                  },
                  {
                    label: "Every week",
                    onClick: () => {
                      formik.setFieldValue("repeat_interval", 1);
                      formik.setFieldValue("repeat_unit", RepeatUnit.WEEK);
                      formik.setFieldValue("repeat_ends_on", "");
                      setCustomRepeat(false);
                    },
                  },
                  {
                    label: "Every month",
                    onClick: () => {
                      formik.setFieldValue("repeat_interval", 1);
                      formik.setFieldValue("repeat_unit", RepeatUnit.MONTH);
                      formik.setFieldValue("repeat_ends_on", "");
                      setCustomRepeat(false);
                    },
                  },
                  {
                    label: "Every Quarter",
                    onClick: () => {
                      formik.setFieldValue("repeat_interval", 1);
                      formik.setFieldValue("repeat_unit", RepeatUnit.QUARTER);
                      formik.setFieldValue("repeat_ends_on", "");
                      setCustomRepeat(false);
                    },
                  },
                  {
                    label: "Custom",
                    onClick: () => {
                      setCustomRepeat(true);
                    },
                  },
                ].map((repeat) => (
                  <Menu.Item key={repeat.label}>
                    <Button
                      onClick={repeat.onClick}
                      className="flex justify-start w-40 hover:bg-slate-100"
                    >
                      {repeat.label}
                    </Button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {customRepeat ? (
          <div className="grid grid-cols-2 gap-4 items-center bg-slate-100 p-4 rounded-md">
            <div>
              <Label>repeat every</Label>
              <div className="grid grid-cols-6 gap-4">
                <Input
                  className="col-span-2 w-full border-none py-1 px-2 shadow shadow-slate-300"
                  $as="select"
                  disabled={formik.values.repeat_unit === RepeatUnit.NONE}
                  type="number"
                  id="repeat_interval"
                  name="repeat_interval"
                  value={formik.values.repeat_interval}
                  onChange={formik.handleChange}
                  $invalid={!!formik.errors.repeat_interval}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Input>
                <Input
                  className="col-span-4 w-full border-none py-1 px-2 shadow shadow-slate-300"
                  $as="select"
                  id="repeat_unit"
                  name="repeat_unit"
                  value={formik.values.repeat_unit}
                  onChange={formik.handleChange}
                  $invalid={!!formik.errors.repeat_unit}
                >
                  {Object.keys(RepeatUnit).map((key) => (
                    <option key={key} value={key}>
                      {key.toLowerCase()}
                    </option>
                  ))}
                </Input>
              </div>
            </div>

            <div>
              <Label>until</Label>
              <Datepicker
                buttonClassName="border-none py-1 px-2 shadow shadow-slate-300 bg-white"
                id="repeat_ends_on"
                name="repeat_ends_on"
                $invalid={!!formik.errors.repeat_ends_on}
                placeholderText="Forever"
                selected={
                  formik.values.repeat_ends_on
                    ? new Date(formik.values.repeat_ends_on)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue("repeat_ends_on", date?.toISOString())
                }
              />
            </div>
          </div>
        ) : null}

        <div className="flex flex-row gap-4 items-end justify-center">
          {[
            PaymentType.EXPENSE,
            PaymentType.TRANSFER,
            PaymentType.BUDGET,
          ].includes(paymentType) && (
            <div className="flex-grow">
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

          {paymentType === PaymentType.TRANSFER && (
            <div className="pb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          )}

          {[PaymentType.INCOME, PaymentType.TRANSFER].includes(paymentType) && (
            <div className="flex-grow">
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
        </div>

        <div>
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
        <div className=" flex justify-end gap-3">
          <SecondaryButton type="button" onClick={onCancel}>
            Close
          </SecondaryButton>
          <PrimaryButton type="submit">Save changes</PrimaryButton>
        </div>
      </div>
    </form>
  );
}
