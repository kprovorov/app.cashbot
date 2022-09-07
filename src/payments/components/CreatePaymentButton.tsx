import React, { PropsWithChildren, useState } from "react";
import { Button } from "react-bootstrap";
import { CreatePaymentModal } from "./CreatePaymentModal";
import Account from "../../interfaces/Account";

export default function CreatePaymentButton({
  accounts,
  onPaymentCreated,
}: PropsWithChildren<{ accounts: Account[]; onPaymentCreated: () => void }>) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreated = () => {
    handleClose();
    onPaymentCreated();
  };

  return (
    <>
      <Button onClick={handleShow} className="ms-2">
        Add Payment
      </Button>
      <CreatePaymentModal
        show={show}
        onClose={handleClose}
        onCreated={handleCreated}
        accounts={accounts}
      />
    </>
  );
}
