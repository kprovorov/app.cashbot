import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import { updatePayment } from "../../api/accounts";
import UpdatePaymentData from "../../interfaces/UpdatePaymentData";
import Payment from "../../interfaces/Payment";
import Account from "../../interfaces/Account";

export default function EditPaymentForm({
  payment,
  formId,
  accounts,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  formId: string;
  accounts: Account[];
  onUpdated: () => void;
}>) {
  const [paymentData, setPaymentData] = useState<UpdatePaymentData>({
    jar_id: payment.jar_id,
    description: payment.description,
    amount: payment.amount / 10000,
    date: payment.date,
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updatePayment(payment.id, paymentData);

    onUpdated();
  };

  return (
    <Form id={formId} onSubmit={submit}>
      <Form.Group>
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type="date"
          value={paymentData.date}
          onChange={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ): void => {
            setPaymentData({
              ...paymentData,
              date: e.target.value,
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Description:</Form.Label>
        <Form.Control
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
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Account:</Form.Label>
        <Form.Select
          value={paymentData.jar_id}
          onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
            setPaymentData({
              ...paymentData,
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
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Amount:</Form.Label>
        <Form.Control
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
      </Form.Group>
    </Form>
  );
}