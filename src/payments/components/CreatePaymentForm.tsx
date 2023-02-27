import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { createPayment } from "../../api/accounts";
import CreatePaymentData from "../../interfaces/CreatePaymentData";
import moment from "moment";
import AccountsContext from "../../context/AccountsContext";
import Input from "../../common/components/ui/forms/Input";
import Label from "../../common/components/ui/forms/Label";

export default function CreatePaymentForm({
  formId,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  onCreated: () => void;
}>) {
  const [paymentData, setPaymentData] = useState<CreatePaymentData>({
    account_id: 0,
    description: "",
    amount: 0,
    date: "",
    repeat_unit: "none",
    repeat_interval: 1,
    repeat_ends_on: "",
    direction: "expense",
    currency: "UAH",
    hidden: false,
    auto_apply: false,
    ends_on: "",
  });

  const { accounts } = useContext(AccountsContext);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createPayment({
      ...paymentData,
      amount:
        paymentData.direction === "income"
          ? paymentData.amount
          : -paymentData.amount,
    });

    onCreated();
  };

  return (
    <form id={formId} onSubmit={submit}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <Label>Date</Label>
          <Input
            type="date"
            value={moment(paymentData.date).format("YYYY-MM-DD")}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                date: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-span-3">
          <Label>Ends</Label>
          <Input
            type="date"
            value={moment(paymentData.ends_on).format("YYYY-MM-DD")}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                ends_on: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-span-2">
          <Label>Repeat Unit</Label>
          <Input
            $as="select"
            value={paymentData.repeat_unit}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                repeat_unit: e.target.value as CreatePaymentData["repeat_unit"],
              });
            }}
          >
            <option value="none">never</option>
            <option value="day">daily</option>
            <option value="week">weekly</option>
            <option value="month">monthly</option>
            <option value="quarter">quarterly</option>
            <option value="year">yearly</option>
          </Input>
        </div>

        <div className="col-span-2">
          <Label>Repeat interval</Label>
          <Input
            disabled={paymentData.repeat_unit === "none"}
            type="number"
            value={paymentData.repeat_interval}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                repeat_interval: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="col-span-2">
          <Label>Repeat Ends</Label>
          <Input
            disabled={paymentData.repeat_unit === "none"}
            type="date"
            value={moment(paymentData.repeat_ends_on).format("YYYY-MM-DD")}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                repeat_ends_on: e.target.value,
              });
            }}
          />
        </div>

        <div className="col-span-6">
          <Label>Account</Label>
          <Input
            $as="select"
            value={paymentData.account_id}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                currency:
                  accounts.find((a) => a.id === Number(e.target.value))
                    ?.currency || "UAH",
                account_id: Number(e.target.value),
              });
            }}
          >
            <option>Please select...</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
        </div>

        <div className="col-span-2">
          <Label>Amount</Label>
          <Input
            type="text"
            value={paymentData.amount}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                amount: Number(e.target.value),
              });
            }}
          />
        </div>
        <div className="col-span-2">
          <Label>Currency</Label>
          <Input
            $as="select"
            value={paymentData.currency}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                currency: e.target.value,
              });
            }}
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Input>
        </div>
        <div className="col-span-2">
          <Label>Direction</Label>
          <Input
            $as="select"
            value={paymentData.direction}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                direction: e.target.value as "expense" | "income",
              });
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
            value={paymentData.description}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                description: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </form>
  );
}
