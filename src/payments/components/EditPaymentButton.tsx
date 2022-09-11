import React, { PropsWithChildren, useState } from "react";
import { Button } from "react-bootstrap";
import EditPaymentModal from "./EditPaymentModal";
import Payment from "../../interfaces/Payment";
import Account from "../../interfaces/Account";

export default function EditPaymentButton({
  payment,
  accounts,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  accounts: Account[];
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
        accounts={accounts}
        payment={payment}
        show={show}
        onClose={handleClose}
        onUpdated={handleUpdated}
      />
    </>
  );
}
