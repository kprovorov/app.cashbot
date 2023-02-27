import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { updatePayment } from "../../api/accounts";
import UpdatePaymentData from "../../interfaces/UpdatePaymentData";
import Payment from "../../interfaces/Payment";
import moment from "moment";
import AccountsContext from "../../context/AccountsContext";
import Label from "../../common/components/ui/forms/Label";
import Input from "../../common/components/ui/forms/Input";

export default function EditPaymentForm({
  payment,
  formId,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  formId: string;
  onUpdated: () => void;
}>) {
  const [paymentData, setPaymentData] = useState<UpdatePaymentData>({
    account_id: payment.account_id,
    description: payment.description,
    amount: Math.abs(payment.amount / 10000),
    date: payment.date,
    direction: payment.amount > 0 ? "income" : "expense",
    currency: payment.currency,
    hidden: payment.hidden,
    auto_apply: payment.auto_apply,
    ends_on: payment.ends_on,
    repeat_unit: payment.repeat_unit,
  });

  const { accounts } = useContext(AccountsContext);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updatePayment(payment.id, {
      ...paymentData,
      amount:
        paymentData.direction === "income"
          ? paymentData.amount
          : -paymentData.amount,
    });

    onUpdated();
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
            value={
              paymentData.ends_on
                ? moment(paymentData.ends_on).format("YYYY-MM-DD")
                : ""
            }
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
            value={paymentData.repeat_unit}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
                repeat_unit: e.target.value as UpdatePaymentData["repeat_unit"],
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
        <div className="col-span-3">
          <Label>Account</Label>
          <Input
            $as="select"
            value={paymentData.account_id}
            onChange={(e): void => {
              setPaymentData({
                ...paymentData,
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
