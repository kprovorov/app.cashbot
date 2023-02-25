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
      <div className="grid grid-cols-3 gap-4">
        <div>
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
        <div>
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
        <div>
          <Label>Repeat</Label>
          <Input
            $as="select"
            value={paymentData.repeat}
            onChange={(e): void => {
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
          </Input>
        </div>

        <div className="col-span-3">
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

        <div>
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
        <div>
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
        <div>
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

        <div className="col-span-3">
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
