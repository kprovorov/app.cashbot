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
        className="ms-2"
        size="sm"
        variant="outline-primary"
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
