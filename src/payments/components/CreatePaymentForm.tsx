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
import Select from "../../common/components/ui/forms/Select";
import Label from "../../common/components/ui/forms/Label";

export default function CreatePaymentForm({
  formId,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  onCreated: () => void;
}>) {
  const [paymentData, setPaymentData] = useState<CreatePaymentData>({
    jar_id: 0,
    description: "",
    amount: 0,
    date: "",
    repeat: "none",
    direction: "expense",
    currency: "UAH",
    hidden: false,
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
      <div className="tw-grid tw-grid-cols-3 tw-gap-4">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={moment(paymentData.date).format("YYYY-MM-DD")}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void => {
              setPaymentData({
                ...paymentData,
                date: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <Label>Ends</Label>
          <Input
            type="date"
            value={moment(paymentData.ends_on).format("YYYY-MM-DD")}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void => {
              setPaymentData({
                ...paymentData,
                ends_on: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <Label>Repeat</Label>
          <Select
            value={paymentData.repeat}
            onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
              setPaymentData({
                ...paymentData,
                repeat: e.target.value,
              });
            }}
          >
            <option value="none">none</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="quarterly">quarterly</option>
          </Select>
        </div>

        <div className="tw-col-span-3">
          <Label>Account</Label>
          <Select
            value={paymentData.jar_id}
            onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
              setPaymentData({
                ...paymentData,
                currency:
                  accounts.find((account) => {
                    return account.jars.find((jar) => {
                      return jar.id === Number(e.target.value);
                    });
                  })?.currency || "UAH",
                jar_id: Number(e.target.value),
              });
            }}
          >
            <option>Please select...</option>
            {accounts.map((account) =>
              account.jars.map((jar) => (
                <option key={jar.id} value={jar.id}>
                  {account.name} ({account.currency}) - {jar.name}
                </option>
              ))
            )}
          </Select>
        </div>

        <div>
          <Label>Amount</Label>
          <Input
            type="text"
            value={paymentData.amount}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void => {
              setPaymentData({
                ...paymentData,
                amount: Number(e.target.value),
              });
            }}
          />
        </div>
        <div>
          <Label>Currency</Label>
          <Select
            value={paymentData.currency}
            onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
              setPaymentData({
                ...paymentData,
                currency: e.target.value,
              });
            }}
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Select>
        </div>
        <div>
          <Label>Direction</Label>
          <Select
            value={paymentData.direction}
            onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
              setPaymentData({
                ...paymentData,
                direction: e.target.value as "expense" | "income",
              });
            }}
          >
            <option value="expense">expense</option>
            <option value="income">income</option>
          </Select>
        </div>

        <div className="tw-col-span-3">
          <Label>Description</Label>
          <Input
            type="text"
            value={paymentData.description}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void => {
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
