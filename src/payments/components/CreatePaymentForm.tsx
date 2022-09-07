import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import Account from "../../interfaces/Account";
import { createPayment } from "../../api/accounts";
import CreatePaymentData from "../../interfaces/CreatePaymentData";

export default function CreatePaymentForm({
  formId,
  accounts,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  accounts: Account[];
  onCreated: () => void;
}>) {
  const [paymentData, setPaymentData] = useState<CreatePaymentData>({
    jar_id: 0,
    description: "",
    amount: 0,
    currency: "",
    date: "",
    balance: 0,
    repeat: "none",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createPayment(paymentData.jar_id, {
      ...paymentData,
      amount: paymentData.amount * 10000,
    });

    onCreated();
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

      <Form.Group className="mt-2">
        <Form.Label>Repeat:</Form.Label>
        <Form.Select
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
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
