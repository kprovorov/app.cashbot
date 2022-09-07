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
