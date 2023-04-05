import { PropsWithChildren, useEffect, useState } from "react";
import { useAccountsQuery } from "../../api/accounts";
import CreatePaymentData from "../../interfaces/CreatePaymentData";
import Input from "../../common/components/ui/forms/Input";
import Label from "../../common/components/ui/forms/Label";
import { useFormik } from "formik";
import { useCreatePayment } from "../../api/payments";
import { useHandleValidationErrors } from "../../hooks/common";
import InputError from "../../common/components/ui/forms/InputError";
import { Currency, PaymentType, RepeatUnit } from "../../types/Enums";
import { Menu, Tab } from "@headlessui/react";
import Button from "../../common/components/ui/buttons/Button";
import Datepicker from "../../common/components/ui/forms/Datepicker";
import AmountInput from "../../common/components/ui/forms/AmountInput";
import CurrencySwitch from "../../common/components/ui/forms/CurrencySwitch";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import SubmitButton from "../../common/components/ui/buttons/SubmitButton";
import InputButton from "../../common/components/ui/buttons/InputButton";
import Info from "../../common/components/Info";

export default function CreatePaymentForm({
  paymentType = undefined,
  accountId = undefined,
  onCreated,
  onCancel = () => {},
}: PropsWithChildren<{
  paymentType?: PaymentType;
  accountId?: number;
  onCreated: () => void;
  onCancel?: () => void;
}>) {
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>(
    PaymentType.EXPENSE
  );
  const [customRepeat, setCustomRepeat] = useState(false);
  const descriptions: { [key in PaymentType]: string } = {
    [PaymentType.EXPENSE]: "Plan expense payment",
    [PaymentType.INCOME]:
      "Plan income payment. When budgeting expenses, the amount decreases daily. For instance, if you set a weekly payment of 700 EUR, after 2 days, it displays as 500 EUR.",
    [PaymentType.TRANSFER]: "Transfer between your accounts",
    [PaymentType.BUDGET]:
      "When budgeting expenses, the amount decreases daily. For instance, if you set a weekly payment of 700 EUR, after 2 days, it displays as 500 EUR.",
  };
  const handleValidationErrors = useHandleValidationErrors<CreatePaymentData>();
  const { mutate, isLoading } = useCreatePayment();

  useEffect(() => {
    if (paymentType) {
      setSelectedPaymentType(paymentType);
    }

    if (accountId) {
      formik.setFieldValue("account_from_id", accountId);
      formik.setFieldValue("account_to_id", accountId);
    }
  }, []);

  const formik = useFormik<CreatePaymentData>({
    initialValues: {
      account_to_id: undefined,
      account_from_id: undefined,
      description: "",
      amount: 0,
      currency: Currency.UAH,
      date: "",
      budget: selectedPaymentType === PaymentType.BUDGET,
      auto_apply: false,
      repeat_unit: RepeatUnit.NONE,
      repeat_interval: 1,
      repeat_ends_on: "",
    },
    onSubmit: (values) => {
      mutate(
        {
          ...values,
          budget: selectedPaymentType === PaymentType.BUDGET,
          account_from_id: [
            PaymentType.EXPENSE,
            PaymentType.TRANSFER,
            PaymentType.BUDGET,
          ].includes(selectedPaymentType)
            ? values.account_from_id
            : undefined,
          account_to_id: [PaymentType.INCOME, PaymentType.TRANSFER].includes(
            selectedPaymentType
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

  const { data: accounts } = useAccountsQuery();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-lightest p-2 rounded-lg">
          <Tab.Group
            selectedIndex={Object.values(PaymentType).indexOf(
              selectedPaymentType
            )}
          >
            <Tab.List>
              {Object.values(PaymentType).map((key) => (
                <Tab
                  key={key}
                  className="ui-selected:bg-white ui-selected:shadow ui-selected:shadow-gray px-3 py-1 rounded capitalize font-semibold"
                  onClick={() => setSelectedPaymentType(key)}
                >
                  {key.toLowerCase()}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <Info>{descriptions[selectedPaymentType]}</Info>
        <div className="flex flex-col items-center justify-center py-8">
          <AmountInput
            giant={true}
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
                as={InputButton}
                className="w-full flex flex-row justify-between text-gray-dark font-normal font-sans leading-tight bg-gray-lightest hover:bg-gray-light"
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
              <Menu.Items className="absolute bg-white shadow-lg shadow-black/20 p-3 w-full rounded-md flex flex-col">
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
                      $size="sm"
                      onClick={repeat.onClick}
                      className="flex justify-start w-full hover:bg-gray-lightest text-gray-dark"
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
          <div className="grid grid-cols-2 gap-4 items-center bg-gray-lightest p-4 rounded-md">
            <div>
              <Label>repeat every</Label>
              <div className="grid grid-cols-6 gap-4">
                <Input
                  className="col-span-2 w-full border-none shadow shadow-gray bg-white"
                  $size="sm"
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
                  className="col-span-4 w-full border-none shadow shadow-gray bg-white"
                  $size="sm"
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
                buttonClassName="border-none shadow shadow-gray bg-white"
                id="repeat_ends_on"
                name="repeat_ends_on"
                $size="sm"
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
          ].includes(selectedPaymentType) && (
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

          {selectedPaymentType === PaymentType.TRANSFER && (
            <div className="pb-4">
              <ArrowRightIcon className="w-6 h-6" />
            </div>
          )}

          {[PaymentType.INCOME, PaymentType.TRANSFER].includes(
            selectedPaymentType
          ) && (
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
        <div className="flex justify-center">
          <SubmitButton type="submit" className="w-full" $loading={isLoading}>
            Save
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
