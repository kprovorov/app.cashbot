import React, { PropsWithChildren, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { updatePayment } from "../../api/accounts";
import Payment from "../../interfaces/Payment";

export default function HidePaymentButton({
  payment,
  onUpdated,
  size,
}: PropsWithChildren<{
  payment: Payment;
  onUpdated: () => void;
  size?: "sm" | "lg";
}>) {
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    const { jar_id, description, date, currency } = payment;

    await updatePayment(payment.id, {
      jar_id,
      description,
      amount: payment.amount / 10000,
      date,
      currency,
      direction: payment.amount > 0 ? "income" : "expense",
      hidden: !payment.hidden,
    });
    setLoading(false);
    onUpdated();
  };

  return (
    <Button
      disabled={loading}
      onClick={submit}
      className="ms-2"
      variant="outline-secondary"
      size={size}
    >
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i className={payment.hidden ? "bi bi-eye" : "bi bi-eye-slash"}></i>
      )}{" "}
      {payment.hidden ? "Show" : "Hide"}
    </Button>
  );
}
