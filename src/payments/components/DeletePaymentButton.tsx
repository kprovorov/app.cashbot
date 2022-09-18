import React, { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import { deletePayment } from "../../api/accounts";

export default function DeletePaymentButton({
  paymentId,
  onDeleted,
  size = "lg",
}: PropsWithChildren<{
  paymentId: number;
  onDeleted: () => void;
  size?: "sm" | "lg";
}>) {
  const submit = async () => {
    await deletePayment(paymentId);

    onDeleted();
  };

  return (
    <Button
      onClick={submit}
      className="ms-2 text-danger"
      variant="light"
      size={size}
    >
      <i className="bi bi-trash"></i>
    </Button>
  );
}
