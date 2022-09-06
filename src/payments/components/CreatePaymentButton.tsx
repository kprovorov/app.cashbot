import React, { PropsWithChildren, useState } from "react";
import { Button } from "react-bootstrap";
import { CreatePaymentModal } from "./CreatePaymentModal";
import Account from "../../interfaces/Account";

export default function CreatePaymentButton({
  accounts,
}: PropsWithChildren<{ accounts: Account[] }>) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="ms-2">
        Add Payment
      </Button>
      <CreatePaymentModal
        show={show}
        onClose={handleClose}
        onCreated={handleClose}
        accounts={accounts}
      />
    </>
  );
}
