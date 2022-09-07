import React, { PropsWithChildren, useState } from "react";
import { Button } from "react-bootstrap";
import EditPaymentModal from "./EditPaymentModal";
import Payment from "../../interfaces/Payment";

export default function UpdatePaymentButton({
  payment,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  onUpdated: () => void;
}>) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdated = () => {
    handleClose();
    onUpdated();
  };

  return (
    <>
      <Button
        onClick={handleShow}
        size="sm"
        className="text-primary"
        variant="light"
      >
        Edit Payment
      </Button>
      <EditPaymentModal
        payment={payment}
        show={show}
        onClose={handleClose}
        onUpdated={handleUpdated}
      />
    </>
  );
}
