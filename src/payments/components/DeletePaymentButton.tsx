import React, { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import { deletePayment } from "../../api/accounts";

export default function DeletePaymentButton({
  paymentId,
  onDeleted,
}: PropsWithChildren<{ paymentId: number; onDeleted: () => void }>) {
  const submit = async () => {
    await deletePayment(paymentId);

    onDeleted();
  };

  return (
    <Button
      onClick={submit}
      className="ms-2 text-danger"
      variant="light"
      size="sm"
    >
      Delete
    </Button>
  );
}
